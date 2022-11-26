const User = require('../models/user.model')
const encrypt = require('../helpers/bcrypt.helper')
const Role = require('../models/role.model')

const authController = {}

/**
 * Método que permite crear y registrar un nuevo usuario (cliente) en Base de datos
 * @param  {Models.User} req.body [Recibe un modelo User por body formato JSON con un POST http request]
 * @return {JSON response}  [Retorna una respuesta http en formato JSON]
 * @author Isaac
 */
authController.signUp = async (req, res, next) => {
    const roleClient = await Role.findOne({ name: 'Cliente' })
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

/**
 * Método que permite autenticar las credenciales del usuario en Base de datos
 * @param  {Models.User.email:matricula:password} req.body [Recibe la contraseña y correo o matricula del usuario (POST Request)]
 * @return {JSON response}  [Retorna una respuesta http en formato JSON]
 * @author Isaac
 */
authController.signIn = async (req, res, next) => {
    const { emailOrId, pass } = req.body
    try {
        const userFound = await User.findOne({ $or: [{ email: emailOrId }, { matricula: emailOrId }] })
        if (!userFound) {
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
            var userRole = await Role.findById(userFound.role)
            const userDataSession = { id: userFound._id, completeName: userFound.completeName, email: userFound.email, role: userRole.name, matricula: userFound.matricula, imageUrl: userFound.imageUrl }
            req.session.userSession = userDataSession
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

/**
 * Metodo para limpiar la session de cookie session
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
authController.signOut = async (req, res, next) => {
    req.session = null
    res.redirect('/')
}

module.exports = authController