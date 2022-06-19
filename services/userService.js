const bcrypt = require('bcrypt')
const ApiError = require('../exceptions/ApiError')
const tokenService = require('./tokenService')

const { User } = require('../db/models')

class UserService {
    async registration(firstName, lastName, email, password, prof, department, gender) {
        console.log(firstName, lastName, email, password, prof, department, gender)
        const hashPassword = await bcrypt.hash(password, 8)
        const user = await User.create({
            email:email,
            firstName: firstName,
            lastName: lastName,
            prof: prof,
            department: department,
            gender: gender,
            password: hashPassword,
        })
        console.log(user, 'USER')
        const userDto = { email: user.email, id: user.id }
        const tokens = tokenService.generateToken({ ...userDto })
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return { ...tokens, user: userDto }
    }

    async login(email, password) {
        const user = await User.findOne({where: {email}})
        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        const isCorrectPass = await bcrypt.compare(password, user.password)
        if (!isCorrectPass) {
            throw ApiError.BadRequest('Неверный пароль')
        }
        const userDto = {email: user.email,  id: user.id}
        const tokens = tokenService.generateToken({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData =  tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }
        const user = await User.findOne({where: {id: userData.id}})
        const userDto = {email: user.email,  id: user.id}
        const tokens = tokenService.generateToken({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }
}

module.exports = new UserService()
