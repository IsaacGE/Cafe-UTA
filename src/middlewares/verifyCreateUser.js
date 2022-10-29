const User = require('../models/user.model')

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
        if(req.body.role == '' || req.body.role == undefined) {
            req.body.role = 'client'
        }
        if (req.body.role != 'admin' && req.body.role != 'client' && req.body.role != 'employee') {
            return res.status(400).json({
                ok: false,
                role: req.body.role,
                msg: `El rol ${req.body.role} no es válido`
            }) 
        }
        next()
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}


module.exports = verifyRegisterUser