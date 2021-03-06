const router = require('express').Router()
const PDFDocument = require('pdfkit')
const fs = require('fs')
const { rm } = require('fs/promises')
const { Patient, Hystory, Temperature, Presure, Breethe, Pulse, Notation } = require('../db/models')

router.route('/:id').get(async (req, res) => {
    if (req.params.id) {
        try {
            const patient = await Patient.findOne({ where: { id: req.params.id } })
            const hystory = await Hystory.findAll({ where: { patient_id: patient.id } })
            const notation = await Notation.findAll({ where: { patient_id: patient.id } })
            const patient0 = hystory[0] ? Object.keys(hystory[0]) : 0
            const patient1 = hystory[1] ? Object.keys(hystory[1]) : 0
            const patient2 = hystory[2] ? Object.keys(hystory[2]) : 0

            const notation0 = notation[0] ? Object.keys(notation[0]) : 0
            const notation1 = notation[1] ? Object.keys(notation[1]) : 0
            const notation2 = notation[2] ? Object.keys(notation[2]) : 0
            const notation3 = notation[3] ? Object.keys(notation[3]) : 0
            const notation4 = notation[4] ? Object.keys(notation[4]) : 0
            const notation5 = notation[5] ? Object.keys(notation[5]) : 0
            let pdfDoc = new PDFDocument()
            pdfDoc.pipe(fs.createWriteStream('./sample.pdf'))
            pdfDoc.font(`./build/arial.ttf`)
            pdfDoc.fontSize(20)
            pdfDoc.text('Информация о пациенте: ')
            pdfDoc.moveDown()
            pdfDoc.fontSize(15)
            pdfDoc.text(`Имя: ${patient.firstName}`)
            pdfDoc.moveDown()
            pdfDoc.fontSize(15)
            pdfDoc.text(`Фамилия: ${patient.lastName} `)
            pdfDoc.moveDown()
            pdfDoc.fontSize(15)
            pdfDoc.text(`Адрес проживания: ${patient.address}`)
            pdfDoc.moveDown()
            pdfDoc.fontSize(15)
            pdfDoc.text(`Номер паспорта: ${patient.passport} `)
            pdfDoc.moveDown()
            pdfDoc.fontSize(15)
            pdfDoc.text(`Работа: ${patient.job}`)
            pdfDoc.moveDown()
            pdfDoc.fontSize(15)
            pdfDoc.text(`Группа крови: ${patient.group_blood}`)
            pdfDoc.moveDown()
            pdfDoc.fontSize(15)
            pdfDoc.text(`Номер удостоверения социальной защиты: ${patient.insurance_number} `)
            pdfDoc.moveDown()
            pdfDoc.fontSize(15)
            pdfDoc.text(`Категория пациента: ${patient.category_patient} `)
            pdfDoc.moveDown()
            pdfDoc.addPage()
            pdfDoc.fontSize(20)
            pdfDoc.text('Карта пациента: ')
            pdfDoc.moveDown()
            //
            if (patient0.length !== 0 && hystory[0] !== undefined) {
                pdfDoc.fontSize(15)
                pdfDoc.text(`Дата поступления: ${hystory[0].receipt_date}`)
                pdfDoc.moveDown()
                pdfDoc.fontSize(15)
                pdfDoc.text(`Симптомы: ${hystory[0].simptoms}`)
                pdfDoc.moveDown()
                pdfDoc.fontSize(15)
                pdfDoc.text(`Первичный диагноз: ${hystory[0].press_diagnos}`)
                pdfDoc.moveDown()
                pdfDoc.fontSize(15)
                pdfDoc.text(`Диагноз: ${hystory[0].diagnos}`)
                pdfDoc.moveDown()
                pdfDoc.fontSize(15)
                pdfDoc.text(`Палата: ${hystory[0].palata}`)
                pdfDoc.moveDown()
                pdfDoc.fontSize(15)
                pdfDoc.text(`Лечащий врач: ${hystory[0].doctor}`)
                pdfDoc.moveDown()
                pdfDoc.fontSize(15)
                pdfDoc.text(`Кто направил: ${hystory[0].from_who}`)
                pdfDoc.moveDown()
                pdfDoc.fontSize(15)
                pdfDoc.text(`Дата выписки: ${hystory[0].exctract_date}`)
                pdfDoc.text(`_________________________________________`)
                pdfDoc.moveDown()
            }

            //

            if (patient1.length !== 0 && hystory[1] !== undefined) {
                pdfDoc.fontSize(15)
                pdfDoc.text(`Дата поступления: ${hystory[1].receipt_date}`)
                pdfDoc.moveDown()
                pdfDoc.fontSize(15)
                pdfDoc.text(`Симптомы: ${hystory[1].simptoms}`)
                pdfDoc.moveDown()
                pdfDoc.fontSize(15)
                pdfDoc.text(`Первичный диагноз: ${hystory[1].press_diagnos}`)
                pdfDoc.moveDown()
                pdfDoc.fontSize(15)
                pdfDoc.text(`Диагноз: ${hystory[1].diagnos}`)
                pdfDoc.moveDown()
                pdfDoc.fontSize(15)
                pdfDoc.text(`Палата: ${hystory[1].palata}`)
                pdfDoc.moveDown()
                pdfDoc.fontSize(15)
                pdfDoc.text(`Лечащий врач: ${hystory[1].doctor}`)
                pdfDoc.moveDown()
                pdfDoc.fontSize(15)
                pdfDoc.text(`Кто направил: ${hystory[1].from_who}`)
                pdfDoc.moveDown()
                pdfDoc.fontSize(15)
                pdfDoc.text(`Дата выписки: ${hystory[1].exctract_date}`)
                pdfDoc.text(`_________________________________________`)
                pdfDoc.moveDown()
            }
            //
            if (patient2.length !== 0 && hystory[2] !== undefined) {
                pdfDoc.fontSize(15)
                pdfDoc.text(`Дата поступления: ${hystory[2].receipt_date}`)
                pdfDoc.moveDown()
                pdfDoc.fontSize(15)
                pdfDoc.text(`Симптомы: ${hystory[2].simptoms}`)
                pdfDoc.moveDown()
                pdfDoc.fontSize(15)
                pdfDoc.text(`Первичный диагноз: ${hystory[2].press_diagnos}`)
                pdfDoc.moveDown()
                pdfDoc.fontSize(15)
                pdfDoc.text(`Диагноз: ${hystory[2].diagnos}`)
                pdfDoc.moveDown()
                pdfDoc.fontSize(15)
                pdfDoc.text(`Палата: ${hystory[2].palata}`)
                pdfDoc.moveDown()
                pdfDoc.fontSize(15)
                pdfDoc.text(`Лечащий врач: ${hystory[2].doctor}`)
                pdfDoc.moveDown()
                pdfDoc.fontSize(15)
                pdfDoc.text(`Кто направил: ${hystory[2].from_who}`)
                pdfDoc.moveDown()
                pdfDoc.fontSize(15)
                pdfDoc.text(`Дата выписки: ${hystory[1].exctract_date}`)
                pdfDoc.text(`_________________________________________`)
            } else {
                console.log('hah')
            }
            pdfDoc.addPage()
            pdfDoc.fontSize(20)
            pdfDoc.text('Лист назначений: ')
            pdfDoc.moveDown()
            //
            if (notation0.length !== 0 && notation[0] !== undefined) {
                pdfDoc.fontSize(15)
                pdfDoc.text(`Дата назначения: ${notation[0].date_inspection}`)
                pdfDoc.moveDown()
                pdfDoc.fontSize(15)
                pdfDoc.text(`Назначение: ${notation[0].medical}`)
                pdfDoc.moveDown()
                pdfDoc.fontSize(15)
                pdfDoc.text(`Заметки: ${notation[0].notes}`)
                pdfDoc.text(`_________________________________________`)
                pdfDoc.moveDown()
            }

            //
            if (notation1.length !== 0 && notation[1] !== undefined) {
                pdfDoc.fontSize(15)
                pdfDoc.text(`Дата назначения: ${notation[1].date_inspection}`)
                pdfDoc.moveDown()
                pdfDoc.fontSize(15)
                pdfDoc.text(`Назначение: ${notation[1].medical}`)
                pdfDoc.moveDown()
                pdfDoc.fontSize(15)
                pdfDoc.text(`Заметки: ${notation[1].notes}`)
                pdfDoc.text(`_________________________________________`)
                pdfDoc.moveDown()
            }
            if (notation2.length !== 0 && notation[2] !== undefined) {
                pdfDoc.fontSize(15)
                pdfDoc.text(`Дата назначения: ${notation[2].date_inspection}`)
                pdfDoc.moveDown()
                pdfDoc.fontSize(15)
                pdfDoc.text(`Назначение: ${notation[2].medical}`)
                pdfDoc.moveDown()
                pdfDoc.fontSize(15)
                pdfDoc.text(`Заметки: ${notation[2].notes}`)
                pdfDoc.text(`_________________________________________`)
                pdfDoc.moveDown()
            }
            if (notation3.length !== 0 && notation[3] !== undefined) {
                pdfDoc.fontSize(15)
                pdfDoc.text(`Дата назначения: ${notation[3].date_inspection}`)
                pdfDoc.moveDown()
                pdfDoc.fontSize(15)
                pdfDoc.text(`Назначение: ${notation[3].medical}`)
                pdfDoc.moveDown()
                pdfDoc.fontSize(15)
                pdfDoc.text(`Заметки: ${notation[3].notes}`)
                pdfDoc.text(`_________________________________________`)
                pdfDoc.moveDown()
            }
            if (notation4.length !== 0 && notation[4] !== undefined) {
                pdfDoc.fontSize(15)
                pdfDoc.text(`Дата назначения: ${notation[4].date_inspection}`)
                pdfDoc.moveDown()
                pdfDoc.fontSize(15)
                pdfDoc.text(`Назначение: ${notation[4].medical}`)
                pdfDoc.moveDown()
                pdfDoc.fontSize(15)
                pdfDoc.text(`Заметки: ${notation[4].notes}`)
                pdfDoc.text(`_________________________________________`)
                pdfDoc.moveDown()
            }
            if (notation5.length !== 0 && notation[5] !== undefined) {
                pdfDoc.fontSize(15)
                pdfDoc.text(`Дата назначения: ${notation[5].date_inspection}`)
                pdfDoc.moveDown()
                pdfDoc.fontSize(15)
                pdfDoc.text(`Назначение: ${notation[5].medical}`)
                pdfDoc.moveDown()
                pdfDoc.fontSize(15)
                pdfDoc.text(`Заметки: ${notation[5].notes}`)
                pdfDoc.text(`_________________________________________`)
                pdfDoc.moveDown()
            }
            pdfDoc.end()
            //

            const url = './sample.pdf'
            if (fs.existsSync(url)) {
                return res.download(url)
            }
            return res.status(400).json({ message: 'nothing' })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: error })
        }
    }
})

module.exports = router
