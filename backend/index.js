const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const studentsRoutes = require('./routes/studentsRoutes')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.json())

// Servir los archivos estaticos en el front
app.use(express.static(path.join(__dirname, '../public'))) // Configuramos la carpeta public para servir archivos estaticos (html)

app.use('/students', studentsRoutes)


const fs = require('fs');
// const path = require('path');
// const app = require('../index')

const dataPath = path.join(__dirname, '../data/studentsData.json')

// app.get('/', (req, res) => {
//     const students = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
//     res.json(students)
// })


app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
})

module.exports = app