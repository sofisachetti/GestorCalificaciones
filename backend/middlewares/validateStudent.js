// Middleware para validar que los datos del estudiante estén completos

const validateStudent = (req, res, next) => {
    const { name, course, role, notes } = req.body
    if (!name || !course || !role || !notes) {
        return res.status(400).json({error: 'No se han completado todos los campos correspondientes.'})
    }
    next()
}

module.exports = {
    validateStudent
}