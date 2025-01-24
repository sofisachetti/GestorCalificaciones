const express = require('express')

// Importamos middlewares y controllers
const studentsController = require('../controllers/studentsController')
const middlewareValidate= require('../middlewares/validateStudent')
const middlewareAuthenticateToken =require('../middlewares/authenticationToken')


const router = express.Router()

// Metodo GET para obtener todos los alumnos
router.get('/', studentsController.getStudents)

// Metodo POST para agregar un nuevo alumno // RUTA PROTEGIDA
router.post('/', middlewareValidate.validateStudent, middlewareAuthenticateToken.authenticateToken, studentsController.addStudent)

// Metodo GET para obtener un estudiante segun su ID
router.get('/:id', studentsController.getStudentById)

// Metodo PUT para actualizar un estudiante segun si ID // RUTA PROTEGIDA
router.put('/:id',middlewareAuthenticateToken.authenticateToken, studentsController.updateStudent)

// Metodo DELETE para eliminar un estudiante por su ID / RUTA PROTEGIDA
router.delete('/:id',middlewareAuthenticateToken.authenticateToken, studentsController.deleteStudent)

//Metodo para Registrar nuevos usuarios
router.post('/register',studentsController.registerUser)

//Método para inicio de sesion
router.post('/login', studentsController.loginUser) //Saque el middleware de autenticacion de aca.. por lo q entendi hay q ponerlo en la ruta protegida

//Método Ruta Protegida acceso 
router.get('/profile', middlewareAuthenticateToken.authenticateToken, (req, res) => {
    res.status(200).send("Ya tienes acceso a las funciones de admin.")
})




//router.get('/profile',middlewareAuthenticateToken.authenticateToken)

module.exports = router

// FALTA
// post user register - recordar usar csae insensitive
// post users login
// middleware de autenticacion
// menejo de errores
// front