const jwt = require('jsonwebtoken')
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY || 'secretKey123'//clave secreta para JWT



async function authenticateToken(req, res, next) {
    // Obtener el encabezado de autorización
    const authHeader =  req.headers['authorization'];

    if (!authHeader || authHeader === "Bearer " + null) {
        console.log("El usuario no esta autorizado para realizar operaciones put, delete y post.");        
        return res.status(401).json({ error: 'No tenés autorización.' });
    }

    // El token debe estar en el formato 'Bearer <token>'
    const token =  authHeader.split(' ')[1];


    if (!token || token === null) {
        return res.status(401).json({ error: 'Token no proporcionado.' });
    }

    try {
        // Verificar el token con jwt.verify (esto también valida la firma y la expiración)
        const decodedToken =  jwt.verify(token, SECRET_KEY);   

        // Guardar el usuario decodificado en req.user
        req.user = decodedToken;
        next(); // Continuar al siguiente middleware o ruta
    } catch (error) {
        // Si el token es inválido o ha expirado
        console.log('Error al verificar el token:', error);
        return res.status(401).json({ error: 'Token inválido o expirado' });
    }
}



module.exports ={
    authenticateToken
}