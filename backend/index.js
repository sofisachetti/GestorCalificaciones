// Importamos modulos
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const studentsRoutes = require('./routes/studentsRoutes')
require('dotenv').config();

// Instanciamos express y definimos puertos
const app = express()
const PORT = process.env.PORT || 3000

// Middleware para habilitar cors
const corsOptions = {
    origin: '*',  
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(bodyParser.json())

// Servir los archivos estaticos en el front
app.use(express.static(path.join(__dirname, '../public'))) // Configuramos la carpeta public para servir archivos estaticos (html)

// Configuración de la ruta principal
app.use('/students', studentsRoutes)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

// Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}/students`);
})

// Exportamos la instanciación de express
module.exports = app
