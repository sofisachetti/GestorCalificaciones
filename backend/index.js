// INDEX -> en esta carpeta solamente tenemos la instanciacion de express, configuración de la ruta principal, definicion del puerto y middlewares

// Importamos modulos
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const studentsRoutes = require('./routes/studentsRoutes')

// Instanciamos express y definimos puertos
const app = express()
const PORT = process.env.PORT || 3000

// Middleware para habilitar cors
app.use(cors())
// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(bodyParser.json())

// Servir los archivos estaticos en el front
app.use(express.static(path.join(__dirname, '../public'))) // Configuramos la carpeta public para servir archivos estaticos (html)

// Configuración de la ruta principal
app.use('/students', studentsRoutes)

// Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}/students`);
})

// Exportamos la instanciación de express
module.exports = app
