const User = require('../models/user.model')
const encrypt = require('../helpers/bcrypt.helper')
const Role = require('../models/role.model')

const authController = {}

authController.signUp = async (req, res, next) => {
    const roleClient = await Role.findOne({name: 'Cliente'})
    const newUser = new User({
        completeName: req.body.name,
        email: req.body.email,
        matricula: req.body.matricula,
        imageUrl: req.body.imageUrl,
        password: await encrypt.encryptPassword(req.body.pass),
        role: roleClient._id
    })
    try {
        const savedUser = await newUser.save()
        res.status(200).json({
            ok: true,
            msg: `!Hola ${newUser.completeName}¡ Se ha creado tu cuenta con éxito`,
            savedUser
        })
    } catch (error) {
        res.status(500).json({ ok: false, msg: `Error Auth.Controller SignUp module: ${error.message}` })
    }
}

authController.signIn = async (req, res, next) => {
    const { emailOrId, pass } = req.body
    try {
        const userFound = await User.findOne({$or:[{email: emailOrId}, {matricula: emailOrId}]})
        if(!userFound) {
            return res.status(404).json({
                ok: false,
                msg: "No se ha encontrado el usuario" 
            })
        }
        if (!userFound.active) {
            return res.status(404).json({
                ok: false,
                msg: "El usuario se encuentra temporalmente deshabilitado" 
            })
        }
        if (await encrypt.comparePassword(pass, userFound.password)) {
            return res.status(200).json({
                ok: true,
                msg: `!Hola ${userFound.completeName}!`,
                userFound 
            })
        }
        return res.status(400).json({
            ok: false,
            msg: "La contraseña es incorrecta" 
        })
    } catch (error) {
        return res.status(500).json({ ok: false, msg: `Error Auth.Controller SignIn module: ${error.message}` })
    }
}

module.exports = authController