const User = require('../models/user.model')

const middlewareUpdateUser = {}

middlewareUpdateUser.isEmailAvailable = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user && req.query.id != user._id.toString()) {
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



module.exports = middlewareUpdateUser