const jwt = require('jsonwebtoken')
const { Refresh_tk } = require('../db/models')

class TokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })
        return {
            accessToken,
            refreshToken,
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData
        } catch (e) {
            return null
        }
    }

     validateRefreshToken(token) {
        try {
            const userData =  jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return userData
        } catch (e) {
            return null
        }
    }

    async saveToken(user_id, refreshToken) {
        const tokenData = await Refresh_tk.findOne({ where: { user_id } })
        if (tokenData) {
            const updatedToken = await Refresh_tk.update({ refresh_tk: refreshToken }, { where: { user_id } })
            return updatedToken
        }
        const newToken = await Refresh_tk.create({ user_id, refresh_tk: refreshToken })
        return newToken
    }

    async removeToken(refreshToken) {
        const currToken = await Refresh_tk.findOne({ where: { refresh_tk: refreshToken } })
        await currToken.destroy()
        return currToken
    }

    async findToken(refreshToken) {
        const currToken = await Refresh_tk.findOne({ where: { refresh_tk: refreshToken } })
        return currToken
    }
}

module.exports = new TokenService()
