const User = require('../models/user.model')
const encrypt = require('../helpers/bcrypt.helper')

const authController = {}

authController.signUp = async (req, res, next) => {
    const newUser = new User({
        completeName: req.body.name,
        email: req.body.email,
        imageUrl: req.body.imageUrl,
        password: await encrypt.encryptPassword(req.body.pass),
        role: req.body.role
    })
    try {
        const savedUser = await newUser.save()
        res.status(200).json({
            ok: true,
            msg: `!Hello ${newUser.completeName}¡ Your account has been created successfully`,
            savedUser
        })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

authController.signIn = async (req, res, next) => {
    const { email, pass } = req.body
    try {
        const userFound = await User.findOne({email: email})
        if(!userFound) {
            return res.status(400).json({
                ok: false,
                msg: "User Not Found" 
            })
        }
        if (!userFound.active) {
            return res.status(400).json({
                ok: false,
                msg: "The user is currently disabled" 
            })
        }
        if (await encrypt.comparePassword(pass, userFound.password)) {
            return res.status(200).json({
                ok: true,
                msg: "Sign in correct",
                userFound 
            })
        }
        return res.status(400).json({
            ok: false,
            msg: "Incorrect password, try again" 
        })
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}

module.exports = authController