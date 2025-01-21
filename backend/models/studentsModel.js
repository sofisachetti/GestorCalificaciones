const fs = require('fs');
const path = require('path');

// Hacemos la ruta hacia nuestra base de datos
const dataPath = path.join(__dirname, '../data/studentsData.json')

// Funcion para obtener todos los usuarios registrados en la base de datos
const getAllStudents = () => JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// Funcion para agregar un nuevo estudiante a la base de datos
const addStudent = (newStudent) => {
    studentsList = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    newStudent = {id: studentsList.length + 1, ...newStudent}
    studentsList.push(newStudent);
    fs.writeFileSync(dataPath, JSON.stringify(studentsList, null, 2), 'utf-8')
    return "Alumno agregado con exito"
}

// Funcion para buscar un estudiante por su ID
const getStudentById = (id) => {
    studentsList = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    const student = studentsList.find(s => s.id === parseInt(id));
    if (!student) {
        return "Estudiante no encontrado."
    } else {
        return student
    }
}

// Funcion para editar la informacion de un alumno
const updateStudent = (id, newData) => {
    studentsList = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    const student = studentsList.find(s => s.id === parseInt(id));
    if (!student) {
        return "Estudiante no encontrado."
    } else {
        const newStudent = {...student, ...newData}
        const i = studentsList.indexOf(student)
        studentsList[i] = newStudent
        fs.writeFileSync(dataPath, JSON.stringify(studentsList, null, 2), 'utf-8')
        return "Estudiante actualizado con exito"
    }
}

// Funcion para eliminar un estudiante
const deleteStudent = (id) => {
    studentsList = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    newStudentList = studentsList.filter(s => s.id !== parseInt(id))
    fs.writeFileSync(dataPath, JSON.stringify(newStudentList, null, 2), 'utf-8')
    return "Estudiante eliminado"
}

// Exportacion de funciones
module.exports = {
    getAllStudents,
    addStudent,
    getStudentById,
    updateStudent,
    deleteStudent
}