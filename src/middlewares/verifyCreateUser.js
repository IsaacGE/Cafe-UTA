const User = require('../models/user.model')

const verifyRegisterUser = {}

verifyRegisterUser.isEmailAvailable = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: `The email ${req.body.email} is not available, try another`
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
                msg: `The role ${req.body.role} is invalid, check it`
            }) 
        }
        next()
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}


module.exports = verifyRegisterUser