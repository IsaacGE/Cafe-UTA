const User = require('../models/user.model')
const Role = require('../models/role.model')

const verifyRegisterUser = {}

verifyRegisterUser.isEmailAvailable = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: `El correo ${req.body.email} no esta disponible`
            })
        }
        next()
    } catch (error) {
        res.status(500).json({ msg: error })
    }
};


verifyRegisterUser.isMatriculaAvailable = async (req, res, next) => {
    try {
        const user = await User.findOne({ matricula: req.body.matricula })
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: `La matricula ${req.body.matricula} no esta disponible`
            })
        }
        next()
    } catch (error) {
        res.status(500).json({ msg: error })
    }
};

verifyRegisterUser.isRoleValid = async (req, res, next) => {
    try {
        var message;
        if (req.body.role == '' || req.body.role == undefined) {
            message = `Debe ingresar un rol para el usuario`
        } else if (req.body.role.length != 24) {
            message = 'EL rol para el usuario no es válido'
        } else {
            const dbRole = await Role.findById(req.body.role)
            if (dbRole) next()
        }
        return res.status(400).json({
            ok: false,
            msg: message,
            role: req.body.role
        })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}


module.exports = verifyRegisterUser