const router = require('express').Router()
const bcrypt = require('bcrypt')
const { Notation } = require('../db/models')

router.route('/:id').get(async (req, res) => {
    if (req.params.id) {
        const data = await Notation.findAll({ where: { patient_id: req.params.id } })
        return res.json(data)
    }
    return res.sendStatus(403)
})

router.route('/').post(async (req, res) => {
    console.log(req.body)
    await Notation.create({ ...req.body })
    const data = await Notation.findAll({ where: { patient_id: req.body.patient_id } })
    return res.json(data)
})

module.exports = router
