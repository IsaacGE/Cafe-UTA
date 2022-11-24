const User = require('../models/user.model')
const encrypt = require('../helpers/bcrypt.helper')

const userController = {}

userController.getAll = async (req, res, next, isCtrlr = false) => {
    try {
        const users = await User.find({ email: { $ne: 'admin.cafeUTA@utags.com' } }).populate({ path: 'role', model: 'Roles' })
        return isCtrlr ? users : res.status(200).json({
            ok: true,
            count: users.length,
            users
        })
    } catch (error) {
        res.status(500).json({ ok: false, msg: `Error User.Controller GetAll module ${error.message}` })
    }
}

userController.getById = async (req, res, next, isCtrlr = false) => {
    try {
        const user = await User.findById(req.query.id)
        return isCtrlr ? user : res.json({ ok: true, user })
    } catch (error) {
        res.status(500).json({ ok: false, msg: `Error User.Controller GetById module ${error.message}` })
    }
}

userController.create = async (req, res, next, isCtrlr = false) => {
    const newUser = new User({
        matricula: req.body.matricula,
        completeName: req.body.name,
        email: req.body.email,
        imageUrl: req.body.imageUrl,
        password: await encrypt.encryptPassword(req.body.pass),
        role: req.body.role
    })
    try {
        await newUser.save()
        return res.status(200).json({
            ok: true,
            msg: `The user ${newUser.completeName} has been registered successfully`
        })
    } catch (error) {
        res.status(500).json({ ok: false, msg: `Error User.Controller Create module ${error.message}` })
    }
}

userController.update = async (req, res, next, isCtrlr = false) => {
    try {
        const oldUser = await User.findById(req.query.id)
        const newUser = new User({
            completeName: req.body.name,
            email: req.body.email,
            imageUrl: req.body.imageUrl,
            role: req.body.role,
            _id: req.query.id
        })
        if (req.body.pass != "") {
            newUser.password = await encrypt.encryptPassword(req.body.pass)
        }

        await User.findByIdAndUpdate(req.query.id, { $set: newUser }, { new: true })
        res.status(200).json({ ok: true, msg: `The user ${oldUser.completeName} has been updated successfully` })
    } catch (error) {
        res.status(500).json({ ok: false, msg: `Error User.Controller Update module ${error.message}` })
    }
}

userController.updateStatus = async (req, res, next, isCtrlr = false) => {
    try {
        const user = await User.findByIdAndUpdate(req.query.id, { $set: { active: req.body.active } }, { new: true });
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: `The user you are trying ${req.body.active == 'true' ? 'enable' : 'disable'} does not exist`
            })
        }
        return res.status(200).json({
            ok: true,
            msg: `The user has been successfully ${req.body.active == 'true' ? 'enabled' : 'disabled'}`
        })
    } catch (error) {
        res.status(500).json({ ok: false, msg: `Error User.Controller UpdateStatus module ${error.message}` })
    }
}

userController.delete = async (req, res, next, isCtrlr = false) => {
    try {
        const userRemoved = await User.findByIdAndDelete(req.query.id)
        return res.json({
            ok: true,
            msg: `The user ${userRemoved.completeName} has been successfully removed`
        })
    } catch (error) {
        res.status(500).json({ ok: false, msg: `Error User.Controller Delete module ${error.message}` })
    }
}

module.exports = userController