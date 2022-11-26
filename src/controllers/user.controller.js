const User = require('../models/user.model')
const encrypt = require('../helpers/bcrypt.helper')

const userController = {}

/**
 * Metodo para obtener todo el catalogo de usuarios en base de datos, incluyendo sus roles
 * Este metodo excluye el usuario SuperAdministrador
 * @param {*} req       
 * @param {*} res 
 * @param {*} next 
 * @param {*} isCtrlr   * Bandera para validar si se esta haciendo peticion desde otro controller o es un request normal
 * @returns 
 */
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

/**
 * Metodo para obtener un usuario por medio de su ID en Base de datos
 * @param {*} req       * Recibe por request query el ID del usuario req.query.id 
 * @param {*} res 
 * @param {*} next 
 * @param {*} isCtrlr   * Bandera para validar si se esta haciendo peticion desde otro controller o es un request normal
 * @returns 
 */
userController.getById = async (req, res, next, isCtrlr = false) => {
    try {
        const user = await User.findById(req.query.id)
        return isCtrlr ? user : res.json({ ok: true, user })
    } catch (error) {
        res.status(500).json({ ok: false, msg: `Error User.Controller GetById module ${error.message}` })
    }
}

/**
 * Metodo para crear un usuario en Base de datos
 * @param {*} req       * Recibe por request body el objeto del usuario a registrar en BD (req.body)
 * @param {*} res 
 * @param {*} next 
 * @param {*} isCtrlr   * Bandera para validar si se esta haciendo peticion desde otro controller o es un request normal
 * @returns 
 */
userController.create = async (req, res, next, isCtrlr = false) => {
    const hashPass = encrypt.encryptPassword(req.body.pass)
    const newUser = new User({
        matricula: req.body.matricula,
        completeName: req.body.name,
        email: req.body.email,
        imageUrl: req.body.imageUrl,
        password: hashPass,
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

/**
 * Metodo para actualizar informacion de usuarios en BD
 * @param {*} req       * Recibe por request query el ID del usuario req.query.id y los datos a actualizar por request body (req.body)
 * @param {*} res 
 * @param {*} next 
 * @param {*} isCtrlr   * Bandera para validar si se esta haciendo peticion desde otro controller o es un request normal
 * @returns 
 */
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
            newUser.password = encrypt.encryptPassword(req.body.pass)
        }

        await User.findByIdAndUpdate(req.query.id, { $set: newUser }, { new: true })
        return res.status(200).json({ ok: true, msg: `The user ${oldUser.completeName} has been updated successfully` })
    } catch (error) {
        res.status(500).json({ ok: false, msg: `Error User.Controller Update module ${error.message}` })
    }
}

/**
 * Metodo para actualizar solamente el status de usuarios en BD
 * @param {*} req       * Recibe por request query el ID del usuario req.query.id y el status a setear por request body (req.body.active)
 * @param {*} res 
 * @param {*} next 
 * @param {*} isCtrlr   * Bandera para validar si se esta haciendo peticion desde otro controller o es un request normal
 * @returns 
 */
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

/**
 * Metodo para eliminar usuarios dentro de la base de datos por ID
 * @param {*} req       * Recibe por request query el ID del usuario a eliminar
 * @param {*} res 
 * @param {*} next 
 * @param {*} isCtrlr   * Bandera para validar si se esta haciendo peticion desde otro controller o es un request normal
 * @returns 
 */
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