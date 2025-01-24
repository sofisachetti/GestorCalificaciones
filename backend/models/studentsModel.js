const { log } = require('console');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config();

const middlewareAuthenticateToken = require('../middlewares/authenticationToken')


const SECRET_KEY = process.env.SECRET_KEY || 'secretKey123';//clave secreta para JWT


// Hacemos la ruta hacia nuestra base de datos
const dataPath = path.join(__dirname, '../data/studentsData.json')

//Ruta hacia la datos usuarios 
const dataUsersPath = path.join(__dirname, '../data/usersData.json')


// Funcion para obtener todos los usuarios registrados en la base de datos
const getAllStudents = () => JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// Funcion para agregar un nuevo estudiante a la base de datos
const addStudent = (newStudent) => {
    studentsList = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    newStudent = { id: studentsList.length + 1, ...newStudent }
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
        if (newData.notes) {
            newData.notes = [...student.notes, ...newData.notes]; // Agrego este if, para q agregue las notas y no las sobreescriba
        }
        const newStudent = { ...student, ...newData }
        const i = studentsList.indexOf(student)
        studentsList[i] = newStudent
        fs.writeFileSync(dataPath, JSON.stringify(studentsList, null, 2), 'utf-8')
        return "Estudiante actualizado con exito"
    }
}

// Funcion para eliminar un estudiante
const deleteStudent = (id) => {
    let studentsList = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    let newStudentList = studentsList.filter(s => s.id !== parseInt(id))
    fs.writeFileSync(dataPath, JSON.stringify(newStudentList, null, 2), 'utf-8')
    return "Estudiante eliminado"
}

//Función para registtrar un usuario
const registerUser = async (email, password) => {
      
    const dataUser = JSON.parse(fs.readFileSync(dataUsersPath))
    const userExists = dataUser.find((user) => user.email === email)
    if (!userExists) {
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = { id: Date.now(), email, password: hashPassword }
        dataUser.push(newUser)
        fs.writeFileSync(dataUsersPath, JSON.stringify(dataUser, null, 2), 'utf-8')
        console.log('Usuario registrado con éxito');
        return 'Usuario registrado con éxito';
        
    }
        console.log("Usuario ya existe")
    }


//Para iniciar sesion
const loginUser = async (email, password) => {
    if (!email || !password) {
        return 'Campos incompletos'
    }
    const dataUser = JSON.parse(fs.readFileSync(dataUsersPath, 'utf-8'))
    const user = dataUser.find((u) => u.email === email)
    if (!user) {
        return 'No encontrado'
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        return 'Contraseña incorrecta'
    }
    //Generar token
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' })
    if(!token){
        console.log('error al generar token');        
    }
    console.log(token);
    return token;
}

// Exportacion de funciones
module.exports = {
    getAllStudents,
    addStudent,
    getStudentById,
    updateStudent,
    deleteStudent,
    registerUser,
    loginUser
}