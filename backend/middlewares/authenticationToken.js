const jwt = require('jsonwebtoken')
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY || 'claveSecreta123';//clave secreta para JWT


//Middleware para verificar el jwt 
function authenticateToken (req, res, next) {
    const authHeader = req.headers['authorization']// lee el encabezado de autorization
    const token=authHeader && authHeader.split(' ')[1]//extre el token 

    if (!token) {
        return res.status(401).json({error: 'Token no proporcionado'})
    }


    //Verificamos validez del token 
jwt.verify(token, SECRET_KEY, (err, user) => {
    if(err){
        return res.status(403).json({error:'Token invalido o expirado'})
    }
    //Guardamos los datos del usuario extraidos del token de la solic
    req.user = user
    next()
})
}

module.exports ={
    authenticateToken
}