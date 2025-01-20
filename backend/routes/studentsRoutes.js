const express = require('express')
const studentsController = require('../controllers/studentsController')

const router = express.Router()

// Metodo get para obtener todos los alumnos
router.get('/', studentsController.getStudents)


// Rutas para gestion de alumnos
// router.post('/addStudent', studentsController.addStudent) // ADD un estudiante
// router.get('/:id', studentsController.getStudentById) // GET de un alumno en especifico por id
// router.put('/:id', studentsController.updateStudent)
// router.delete('/:id', studentsController.deleteStudent)


module.exports = router