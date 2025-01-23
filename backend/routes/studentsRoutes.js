const express = require('express')

// Importamos middlewares y controllers
const studentsController = require('../controllers/studentsController')
const middlewareValidate= require('../middlewares/validateStudent')
const middlewareAuthenticateToken =require('../middlewares/authenticationToken')


const router = express.Router()

// Metodo GET para obtener todos los alumnos
router.get('/', studentsController.getStudents)

// Metodo POST para agregar un nuevo alumno
router.post('/', middlewareValidate.validateStudent, studentsController.addStudent)

// Metodo GET para obtener un estudiante segun su ID
router.get('/:id', studentsController.getStudentById)

// Metodo PUT para actualizar un estudiante segun si ID
router.put('/:id', studentsController.updateStudent)

// Metodo DELETE para eliminar un estudiante por su ID
router.delete('/:id', studentsController.deleteStudent)

//Metodo para Registrar nuevos usuarios
router.post('/register',studentsController.registerStudent)

//Método para inicio de sesion
router.post('/login',middlewareAuthenticateToken.verifyToken, studentsController.loginUser)

//router.get('/protected',middlewareAuthenticateToken.authenticateToken, studentsController.loginUser)


//Método Ruta Protegida acceso 
//router.get('/profile',middlewareAuthenticateToken.authenticateToken)

module.exports = router

// FALTA
// post user register - recordar usar csae insensitive
// post users login
// middleware de autenticacion
// menejo de errores
// front