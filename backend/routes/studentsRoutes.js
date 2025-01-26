const express = require('express')

// Importamos middlewares y controllers
const studentsController = require('../controllers/studentsController')
const middlewareValidate= require('../middlewares/validateStudent')
const middlewareAuthenticateToken =require('../middlewares/authenticationToken')


const router = express.Router()

// Metodo GET para obtener todos los alumnos
router.get('/', studentsController.getStudents)

// Metodo POST para agregar un nuevo alumno - RUTA PROTEGIDA
router.post('/', middlewareValidate.validateStudent, middlewareAuthenticateToken.authenticateToken, studentsController.addStudent)

// Metodo GET para obtener un estudiante segun su ID
router.get('/:id', studentsController.getStudentById)

// Metodo PUT para actualizar un estudiante segun su ID - RUTA PROTEGIDA
router.put('/:id',middlewareAuthenticateToken.authenticateToken, studentsController.updateStudent)

// Metodo DELETE para eliminar un estudiante por su ID - RUTA PROTEGIDA
router.delete('/:id',middlewareAuthenticateToken.authenticateToken, studentsController.deleteStudent)

// Metodo para Registrar nuevos usuarios
router.post('/register',studentsController.registerUser)

// Método para inicio de sesion
router.post('/login', studentsController.loginUser)

// Método Ruta Protegida acceso 
router.post('/profile', middlewareAuthenticateToken.authenticateToken, (req, res) => {
    res.status(200).send("Ya tienes acceso a las funciones de admin.")
})


module.exports = router