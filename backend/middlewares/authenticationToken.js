const jwt = require('jsonwebtoken')
require('dotenv').config();
const SECRET_KEY = 'claveSecreta123';//clave secreta para JWT


function authenticateToken(req, res, next) {
    // Obtener el encabezado de autorización
    const authHeader = req.headers['authorization']; 

    if (!authHeader) {
        return res.status(401).json({ error: 'No tenes autorizacion.' });
    }

    const token = authHeader && authHeader.split(' ')[1];
    const decodedToken = jwt.decode(token, SECRET_KEY);

    req.user = decodedToken;
    next();
}


module.exports ={
    authenticateToken
}