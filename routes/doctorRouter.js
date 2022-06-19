require('dotenv').config()
const router = require('express').Router()
const bcrypt = require('bcrypt');
const indexController = require('../controllers/indexController')



router.get('/', indexController.setUsers)


module.exports = router