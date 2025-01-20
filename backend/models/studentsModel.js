const fs = require('fs');
const path = require('path');

// Hacemos la ruta hacia nuestra base de datos
const dataPath = path.join(__dirname, '../data/studentsData.json')

// Funcion para obtener todos los usuarios registrados en la base de datos
const getAllStudents = () => JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
//console.log(getAllStudents()) -> FUNCIONA

module.exports = {
    getAllStudents
}