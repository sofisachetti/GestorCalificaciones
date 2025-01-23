const jwt = require('jsonwebtoken')
require('dotenv').config();
const SECRET_KEY = 'claveSecreta123';//clave secreta para JWT
// process.env.SECRET_KEY || 

// --------------- PRIMER INTENTO
//Middleware para verificar el jwt 
/*function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization']// lee el encabezado de autorization
    const token = authHeader && authHeader.split(' ')[1]//extre el token 
*/

//  function authenticateToken (req, res, next) {
//     const token = req.headers.authorization.split(' ')// lee el encabezado de autorization ///Antes const authHeader
//    // const token=authHeader && authHeader.split(' ')[1]//extre el token 
   
//     if (!token) {
//         return res.status(401).json({error: 'Token no proporcionado'})
//     }

//     //Verificamos validez del token 
// const decodedToken = jwt.verify(token, SECRET_KEY);

//     if(!decodedToken.email){
//         return res.status(401).json({message: 'Token no coincide con el usuario.'})
//     }
//     //Guardamos los datos del usuario extraidos del token de la solic
//     req.user = decodedToken;    
//     next()
// }

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']; // Obtener el encabezado de autorización

    if (!authHeader) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }

    // Verificar que el encabezado de autorización tiene el formato correcto
    const token = authHeader.split(' ')[1];  // Obtiene el token de la forma "Bearer <token>"

    if (!token) {
        return res.status(401).json({ error: 'TOKEN NO PROPORCIONADO' })
    }

    try {
        // Verificar validez del token
        const decodedToken = jwt.verify(token, SECRET_KEY);

        if (!decodedToken.email) {
            return res.status(401).json({ message: 'Token no coincide con el usuario.' });
        }

        // Guardamos los datos del usuario extraídos del token
        req.user = decodedToken;
        next(); // Continúa con la siguiente función de middleware o controlador
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido o expirado.' });
    }
}


module.exports ={
    authenticateToken
}