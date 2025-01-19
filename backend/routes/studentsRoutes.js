const express = require('express')
const studentsController = require('../controllers/studentsController')
const fs = require('fs');
const path = require('path')


const router = express.Router()

const dataPath = path.join(__dirname, '../data/studentsData.json')

// Rutas para gestion de alumnos
router.get('/', (res, req) => {
        const students = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
        res.json(students)
}) // GET de items - todos los elementos
// router.post('/addStudent', studentsController.addStudent) // ADD un estudiante
// router.get('/:id', studentsController.getStudentById) // GET de un alumno en especifico por id
// router.put('/:id', studentsController.updateStudent)
// router.delete('/:id', studentsController.deleteStudent)

// // Rutas para gestion de usuarios
// router.get('')


module.exports = router