const userService = require('../services/userService')
const { Patient, Hystory, Temperature, Presure, Breethe, Pulse, Notation, User } = require('../db/models')
class UserController {
    async registration(req, res, next) {
        try {
            const { firstName, lastName, email, password, prof, department, gender } = req.body
            const userData = await userService.registration(
                firstName,
                lastName,
                email,
                password,
                prof,
                department,
                gender
            )

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: 'none',
                secure: true,
            })
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body
            const userData = await userService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: 'none',
                secure: true,
            })
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies

            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            res.json(token)
        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            })
            const patients = await Patient.findAll({ where: { user_id: userData.user.id } })
            const data = { userData, patients }
            return res.json(data)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController()
