require('dotenv').config()
const express = require('express')
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()

const PORT = process.env.PORT || 3001

// ROuters
const userRouter = require('./routes/userRouter')
const patientRouter = require('./routes/patientRouter')
const diagramRouter = require('./routes/diagramRouter')
const destinationRouter = require('./routes/destinationRouter')
const downloadRouter = require('./routes/downloadRouter')
const doctorRouter = require('./routes/doctorRouter')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ credentials: true, origin: true }))
app.use(cookieParser())
// app.use(express.static(path.join(process.env.PWD, 'public')))
app.use(express.static(path.join(process.env.PWD, 'build' )))



app.use('/user', userRouter)
app.use('/patient', patientRouter)
app.use('/diagram', diagramRouter)
app.use('/destination', destinationRouter)
app.use('/download', downloadRouter )
app.use('/doctors', doctorRouter )
app.get('/*', (req, res) => {
    // res.sendFile(path.join((__dirname, 'build', 'index.html')))
    res.sendFile('./build/index.html', {root: __dirname})

})

app.listen(PORT, () => {
    console.log('Server started on port', PORT)
})
