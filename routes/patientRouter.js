const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Patient, Hystory, Temperature, Presure, Breethe, Pulse, Notation, User } = require('../db/models')
router.route('/:id').get(async (req, res) => {
    const id = req.params.id
    try {
        const patient = await Patient.findAll({ where: { user_id: id } })
        if (patient) {
            return res.json(patient)
        }
        return res.sendStatus(500).json({ message: 'nothing' })
    } catch (err) {
        console.log(err)
    }
})

router.route('/one').post(async (req, res) => {
    const patient = await Patient.findAll({ where: { id: req.body.id } })
    const hystory = await Hystory.findAll({ where: { patient_id: req.body.id } })
    // diagrams
    const temperatureDiagram = await Temperature.findAll({ where: { patient_id: req.body.id } })
    const presureDiagram = await Presure.findAll({ where: { patient_id: req.body.id } })
    const pulseDiagram = await Pulse.findAll({ where: { patient_id: req.body.id } })
    const breetheDiagram = await Breethe.findAll({ where: { patient_id: req.body.id } })

    if (patient && hystory) {
        try {
            const info = {
                patient,
                hystory,
                temperatureDiagram,
                presureDiagram,
                pulseDiagram,
                breetheDiagram,
            }
            return res.json(info)
        } catch (err) {
            console.log(err)
        }
    }
})

router.route('/exctract').post(async (req, res) => {
   
    const s = await Hystory.update({ exctract_date: req.body.exctract_date }, { where: { patient_id: req.body.id } })
    const patient = await Patient.findAll({ where: { id: req.body.id } })
    const hystory = await Hystory.findAll({ where: { patient_id: req.body.id } })
    
    // diagrams
    const temperatureDiagram = await Temperature.findAll({ where: { patient_id: req.body.id } })
    const presureDiagram = await Presure.findAll({ where: { patient_id: req.body.id } })
    const pulseDiagram = await Pulse.findAll({ where: { patient_id: req.body.id } })
    const breetheDiagram = await Breethe.findAll({ where: { patient_id: req.body.id } })

    if (patient && hystory) {
        try {
            const info = {
                patient,
                hystory,
                temperatureDiagram,
                presureDiagram,
                pulseDiagram,
                breetheDiagram,
            }
            return res.json(info)
        } catch (err) {
            console.log(err)
        }
    }
})

router.route('/').post(async (req, res) => {
    const { sick, info } = req.body
    const passport = info.passport
    if (sick && info) {
        const patient = await Patient.findOne({ where: { passport: passport } })
        if (patient) {
            try {
                const curPatient = await Patient.update({ ...info }, { where: { id: patient.id } })
                // const cur = await Patient.findOne({ where: { id: patient } })
                console.log(patient)
                const curHystory = await Hystory.create({ ...req.body.sick, patient_id: patient.id })
                return res.json(curPatient)
            } catch (err) {
                console.log(err)
            }
        } else {
            console.log(req.cookies, 'rqe')
            const {refreshToken} = req.cookies
            const userData =  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
            const curPatient = await Patient.create({ ...req.body.info, user_id: userData.id })
            const curHystory = await Hystory.create({ ...req.body.sick, patient_id: curPatient.id })
            return res.sendStatus(200)
        }
    }
})

module.exports = router
