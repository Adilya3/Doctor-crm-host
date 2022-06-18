require('dotenv').config()
const router = require('express').Router()
const { Temperature, Presure, Pulse, Breethe, sequelize } = require('../db/models')

router.route('/tepmerature').post(async (req, res) => {
    const dataTemp = await Temperature.findOne({ where: { patient_id: req.body.patient_id } })
    const pole = req.body.pole
    if (dataTemp !== null) {
        try {
           
            const checkDate = dataTemp.date_inspection.includes(req.body.date_inspection)
            if (checkDate) {
                console.log('inCheck')

                if (pole === 'morning') {
                    await Temperature.update(
                        { morning: sequelize.fn('array_append', sequelize.col('morning'), req.body.temperature) },
                        { where: { patient_id: req.body.patient_id } }
                    )
                    const data = await Temperature.findAll({ where: { patient_id: req.body.patient_id } })
                    return res.json(data)
                } else {
                    await Temperature.update(
                        { evening: sequelize.fn('array_append', sequelize.col('evening'), req.body.temperature) },
                        { where: { patient_id: req.body.patient_id } }
                    )
                    const data = await Temperature.findAll({ where: { patient_id: req.body.patient_id } })
                    return res.json(data)
                }
            } else {
                if (pole === 'morning') {
                    await Temperature.update(
                        { morning: sequelize.fn('array_append', sequelize.col('morning'), req.body.temperature) },
                        { where: { patient_id: req.body.patient_id } }
                    )
                    await Temperature.update(
                        {
                            date_inspection: sequelize.fn(
                                'array_append',
                                sequelize.col('date_inspection'),
                                req.body.date_inspection
                            ),
                        },
                        { where: { patient_id: req.body.patient_id } }
                    )
                    const data = await Temperature.findAll({ where: { patient_id: req.body.patient_id } })
                    return res.json(data)
                } else {
                    await Temperature.update(
                        { evening: sequelize.fn('array_append', sequelize.col('evening'), req.body.temperature) },
                        { where: { patient_id: req.body.patient_id } }
                    )
                    await Temperature.update(
                        {
                            date_inspection: sequelize.fn(
                                'array_append',
                                sequelize.col('date_inspection'),
                                req.body.date_inspection
                            ),
                        },
                        { where: { patient_id: req.body.patient_id } }
                    )
                    const data = await Temperature.findAll({ where: { patient_id: req.body.patient_id } })
                    return res.json(data)
                }
            }
        } catch (error) {
            console.log(error)
            return res.sendStatus(403)
        }
    } else {
        const temperatureData = await Temperature.create({
            ...req.body,
            [req.body.pole]: [req.body.temperature],
            date_inspection: [req.body.date_inspection],
        })
        return res.json(temperatureData)
    }
})

router.route('/presure').post(async (req, res) => {
    const dataTemp = await Presure.findOne({ where: { patient_id: req.body.patient_id } })
    const pole = req.body.pole
    if (dataTemp !== null) {
        try {
            const checkDate = dataTemp.date_inspection.includes(req.body.date_inspection)
            if (checkDate) {
                if (pole === 'morning') {
                    await Presure.update(
                        { morning: sequelize.fn('array_append', sequelize.col('morning'), req.body.presure) },
                        { where: { patient_id: req.body.patient_id } }
                    )
                    const data = await Presure.findAll({ where: { patient_id: req.body.patient_id } })
                    return res.json(data)
                } else {
                    await Presure.update(
                        { evening: sequelize.fn('array_append', sequelize.col('evening'), req.body.presure) },
                        { where: { patient_id: req.body.patient_id } }
                    )
                    const data = await Presure.findAll({ where: { patient_id: req.body.patient_id } })
                    return res.json(data)
                }
            } else {
                if (pole === 'morning') {
                    await Presure.update(
                        { morning: sequelize.fn('array_append', sequelize.col('morning'), req.body.presure) },
                        { where: { patient_id: req.body.patient_id } }
                    )
                    await Presure.update(
                        {
                            date_inspection: sequelize.fn(
                                'array_append',
                                sequelize.col('date_inspection'),
                                req.body.date_inspection
                            ),
                        },
                        { where: { patient_id: req.body.patient_id } }
                    )
                    const data = await Presure.findAll({ where: { patient_id: req.body.patient_id } })
                    return res.json(data)
                } else {
                    await Presure.update(
                        { evening: sequelize.fn('array_append', sequelize.col('evening'), req.body.presure) },
                        { where: { patient_id: req.body.patient_id } }
                    )
                    await Presure.update(
                        {
                            date_inspection: sequelize.fn(
                                'array_append',
                                sequelize.col('date_inspection'),
                                req.body.date_inspection
                            ),
                        },
                        { where: { patient_id: req.body.patient_id } }
                    )
                    const data = await Presure.findAll({ where: { patient_id: req.body.patient_id } })
                    return res.json(data)
                }
            }
        } catch (error) {
            console.log(error)
            return res.sendStatus(403)
        }
    } else {
        const presureData = await Presure.create({
            ...req.body,
            [req.body.pole]: [req.body.presure],
            date_inspection: [req.body.date_inspection],
        })
        return res.json(presureData)
    }
})

//

router.route('/pulse').post(async (req, res) => {
    const dataTemp = await Pulse.findOne({ where: { patient_id: req.body.patient_id } })
    const pole = req.body.pole
    if (dataTemp !== null) {
        try {
            const checkDate = dataTemp.date_inspection.includes(req.body.date_inspection)
            if (checkDate) {
                if (pole === 'morning') {
                    await Pulse.update(
                        { morning: sequelize.fn('array_append', sequelize.col('morning'), req.body.pulse) },
                        { where: { patient_id: req.body.patient_id } }
                    )
                    const data = await Pulse.findAll({ where: { patient_id: req.body.patient_id } })
                    return res.json(data)
                } else {
                    await Pulse.update(
                        { evening: sequelize.fn('array_append', sequelize.col('evening'), req.body.pulse) },
                        { where: { patient_id: req.body.patient_id } }
                    )
                    const data = await Pulse.findAll({ where: { patient_id: req.body.patient_id } })
                    return res.json(data)
                }
            } else {
                if (pole === 'morning') {
                    await Pulse.update(
                        { morning: sequelize.fn('array_append', sequelize.col('morning'), req.body.pulse) },
                        { where: { patient_id: req.body.patient_id } }
                    )
                    await Pulse.update(
                        {
                            date_inspection: sequelize.fn(
                                'array_append',
                                sequelize.col('date_inspection'),
                                req.body.date_inspection
                            ),
                        },
                        { where: { patient_id: req.body.patient_id } }
                    )
                    const data = await Pulse.findAll({ where: { patient_id: req.body.patient_id } })
                    return res.json(data)
                } else {
                    await Pulse.update(
                        { evening: sequelize.fn('array_append', sequelize.col('evening'), req.body.pulse) },
                        { where: { patient_id: req.body.patient_id } }
                    )
                    await Pulse.update(
                        {
                            date_inspection: sequelize.fn(
                                'array_append',
                                sequelize.col('date_inspection'),
                                req.body.date_inspection
                            ),
                        },
                        { where: { patient_id: req.body.patient_id } }
                    )
                    const data = await Pulse.findAll({ where: { patient_id: req.body.patient_id } })
                    return res.json(data)
                }
            }
        } catch (error) {
            console.log(error)
            return res.sendStatus(403)
        }
    } else {
        const pulseData = await Pulse.create({
            ...req.body,
            [req.body.pole]: [req.body.pulse],
            date_inspection: [req.body.date_inspection],
        })
        return res.json(pulseData)
    }
})

//
router.route('/breethe').post(async (req, res) => {
    const dataTemp = await Breethe.findOne({ where: { patient_id: req.body.patient_id } })
    const pole = req.body.pole
    if (dataTemp !== null) {
        try {
            const checkDate = dataTemp.date_inspection.includes(req.body.date_inspection)
            if (checkDate) {
                if (pole === 'morning') {
                    await Breethe.update(
                        { morning: sequelize.fn('array_append', sequelize.col('morning'), req.body.breethe) },
                        { where: { patient_id: req.body.patient_id } }
                    )
                    const data = await Breethe.findAll({ where: { patient_id: req.body.patient_id } })
                    return res.json(data)
                } else {
                    await Breethe.update(
                        { evening: sequelize.fn('array_append', sequelize.col('evening'), req.body.breethe) },
                        { where: { patient_id: req.body.patient_id } }
                    )
                    const data = await Breethe.findAll({ where: { patient_id: req.body.patient_id } })
                    return res.json(data)
                }
            } else {
                if (pole === 'morning') {
                    await Breethe.update(
                        { morning: sequelize.fn('array_append', sequelize.col('morning'), req.body.breethe) },
                        { where: { patient_id: req.body.patient_id } }
                    )
                    await Breethe.update(
                        {
                            date_inspection: sequelize.fn(
                                'array_append',
                                sequelize.col('date_inspection'),
                                req.body.date_inspection
                            ),
                        },
                        { where: { patient_id: req.body.patient_id } }
                    )
                    const data = await Breethe.findAll({ where: { patient_id: req.body.patient_id } })
                    return res.json(data)
                } else {
                    await Breethe.update(
                        { evening: sequelize.fn('array_append', sequelize.col('evening'), req.body.breethe) },
                        { where: { patient_id: req.body.patient_id } }
                    )
                    await Breethe.update(
                        {
                            date_inspection: sequelize.fn(
                                'array_append',
                                sequelize.col('date_inspection'),
                                req.body.date_inspection
                            ),
                        },
                        { where: { patient_id: req.body.patient_id } }
                    )
                    const data = await Breethe.findAll({ where: { patient_id: req.body.patient_id } })
                    return res.json(data)
                }
            }
        } catch (error) {
            console.log(error)
            return res.sendStatus(403)
        }
    } else {
        const breetheData = await Breethe.create({
            ...req.body,
            [req.body.pole]: [req.body.breethe],
            date_inspection: [req.body.date_inspection],
        })
        return res.json(breetheData)
    }
})

module.exports = router
