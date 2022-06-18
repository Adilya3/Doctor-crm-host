require('dotenv').config()
const router = require('express').Router()
const bcrypt = require('bcrypt')
const { User } = require('../db/models')
const authCheck = require('../middleware/authCheck')

router.route('/registration').post(async (req, res) => {
    const { firstName, lastName, password, email, prof, gender, department } = req.body
    if (email && firstName && lastName && password && prof && gender && department) {
        const cryptPass = await bcrypt.hash(password, Number(process.env.SALT_ROUND))
        try {
            const currentUser = await User.create({
                ...req.body,
                password: cryptPass,
            })

            req.session.user = {
                id: currentUser.id,
                name: currentUser.firstName,
            }
            const users = await User.findAll({ attributes: ['id', 'firstName', 'lastName'] })
            res.json({
                user: {
                    name: currentUser.firstName,
                    id: currentUser.id,
                },
                users,
            })
        } catch (err) {
            console.log(err)
        }
    }
})

router.route('/login').post(authCheck, async (req, res) => {
    const { email, password } = req.body
    if (email && password) {
        try {
            const currentUser = await User.findOne({ where: { email } })
            if (currentUser && (await bcrypt.compare(password, currentUser.password))) {
                req.session.user = { id: currentUser.id, name: currentUser.firstName }
                const users = await User.findAll({ attributes: ['id', 'firstName', 'lastName'] })
                return res.status(200).json({
                    user: {
                        name: currentUser.firstName,
                        id: currentUser.id,
                    },
                    users,
                })
            } else {
                return res.sendStatus(403).json()
            }
        } catch (err) {
            console.log(err)
            return res.sendStatus(500)
        }
    } else {
        return res.sendStatus(403)
    }
})

router.route('/logout').get((req, res) => {
    try {
        req.session.destroy()
        res.clearCookie('sid').sendStatus(200)
    } catch (error) {
        console.log(error)
        res.sendStatus(401)
    }
})

router.route('/refresh').post(async (req, res) => {
    const { id, name } = req.body
    if (id && name) {
       
        try {
            const user = await User.findOne({ where: { id } })
            if (user.firstName === name && name === req.session.user.name) {
                const users = await User.findAll({ attributes: ['id', 'firstName', 'lastName'] })
                return res.status(200).json({
                    user: {
                        name: req.session.user.firstName,
                        id: req.session.user.id,
                    },
                    users,
                })
            } else {
                res.clearCookie('sid')
                return res.json({message:'destroy tokens'})
                
            }
        } catch (err) {
            console.log(err)
            res.clearCookie('sid')
            return res.sendStatus(500)
        }
    } else {
  
        return res.sendStatus(403)
    }
})

module.exports = router
