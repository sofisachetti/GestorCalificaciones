// Importamos el Modelo
const studentsModel = require('../models/studentsModel')

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

module.exports = {
    getStudents,
    addStudent
}
