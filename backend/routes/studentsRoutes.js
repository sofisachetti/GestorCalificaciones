const express = require('express')
const studentsController = require('../controllers/studentsController')

const router = express.Router()

// Metodo GET para obtener todos los alumnos
router.get('/', studentsController.getStudents)

// Metodo POST para agregar un nuevo alumno
router.post('/', studentsController.addStudent)


module.exports = router



// Rutas para gestion de alumnos
// router.get('/:id', studentsController.getStudentById) // GET de un alumno en especifico por id
// router.put('/:id', studentsController.updateStudent)
// router.delete('/:id', studentsController.deleteStudent)