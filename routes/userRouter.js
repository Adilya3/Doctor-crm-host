require('dotenv').config()
const router = require('express').Router()
const bcrypt = require('bcrypt');
const indexController = require('../controllers/indexController')



router.post('/registration', indexController.registration)
router.post('/login', indexController.login)
router.post('/logout', indexController.logout)
router.get('/refresh', indexController.refresh)

module.exports = router
    




