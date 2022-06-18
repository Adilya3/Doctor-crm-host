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
            console.log(hystory)
            let pdfDoc = new PDFDocument()
            pdfDoc.pipe(fs.createWriteStream('./public/files/sample.pdf'))
            pdfDoc.font(`./arial.ttf`)
            pdfDoc.text(`Имя: ${patient.firstName}  Фамилия: ${patient.lastName}           День Рождения: ${patient.birthDay}` )
            pdfDoc.moveDown()
            pdfDoc.text(`Адрес проживания: ${patient.address}                       Номер паспорта: ${patient.passport}` )
            pdfDoc.moveDown()
            pdfDoc.text(`Работа: ${patient.job}                                     Группа крови: ${patient.group_blood}` )
            pdfDoc.moveDown()
            pdfDoc.text(`Номер удостоверения социальной защиты: ${patient.insurance_number}        Категория пациента: ${patient.category_patient}` )
            pdfDoc.moveDown()

            pdfDoc.text(`Лечащий врач: ${hystory.doctor}` )
            pdfDoc.moveDown()
            pdfDoc.text(`История болезней` )
            pdfDoc.moveDown()
            // pdfDoc.text(`${hystory.map((el)=> `Дата поступления: ${el.receipt_date}   Дата выписки: ${el.exctract_date}`)}` )
            // pdfDoc.moveDown()
         
            pdfDoc.end()
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
