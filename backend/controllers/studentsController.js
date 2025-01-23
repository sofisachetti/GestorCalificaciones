// Importamos el Modelo

const studentsModel = require('../models/studentsModel')
const jwt =require('jsonwebtoken')



//Cargar variable de entorno para la clave secreta del token 
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY || 'secretKey123';//clave secreta para JWT

// Funcion para manejar la solicitud de obtener todos los alumnos
const getStudents = (req, res) => {
    const students = studentsModel.getAllStudents()
    res.json(students)
}

// Funcion para manejar la solicitud de agregar un alumno
const addStudent = (req, res) => {
    const newStudent = { ...req.body }
    studentsModel.addStudent(newStudent)
    res.status(201).json(newStudent)
}

// Funcion para manejar la solicitud de busqueda por ID
const getStudentById = (req, res) => {
    const { id } = req.params
    const student = studentsModel.getStudentById(id);
    res.status(200).json(student)
}

// Funcion para actualizar la informacion de un estudiante
const updateStudent = (req, res) => {
    const { id } = req.params
    const newData = req.body
    studentsModel.updateStudent(id, newData)
    res.status(200).json({ message: 'Estudiante actualizado con exito.' })
}

// Funcion para eliminar un estudiante
const deleteStudent = (req, res) => {
    const { id } = req.params
    studentsModel.deleteStudent(id)
    res.json({ message: 'Estudiante eliminado con exito' })
}

//Función para registar un usuario
const registerStudent = (req, res) => {
    const { email, password } = req.body
    studentsModel.registerStudent(email,password)
    res.status(201).json({message:`Registro del usuario con éxito `})
    }

//Función de inicio de sesión
const loginUser = async (req,res) => {
    const {email,password} = req.body
    const result = await studentsModel.loginUser(email, password) 
    if(!result){
        return res.status(400).json(result);
    }   
    return res.status(200).json({message: 'Inicio de sesión exitoso'})
 }

// Exportacion de funciones
module.exports = {
    getStudents,
    addStudent,
    getStudentById,
    updateStudent,
    deleteStudent,
    registerStudent,
    loginUser
}
