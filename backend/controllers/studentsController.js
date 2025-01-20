// Importamos el Modelo
const studentsModel = require('../models/studentsModel')

// Funcion para manejar la solicitud de obtener todos los alumnos
const getStudents = (req, res) => {
    const students = studentsModel.getAllStudents()
    res.json(students)
}

module.exports = {
    getStudents
}
