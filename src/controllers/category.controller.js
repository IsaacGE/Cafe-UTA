const Category = require('../models/category.model')

const categoryController = {}

/**
 * Método que permite consultar en Base de Datos la categoria por medio del ID
 * @param  {Models.Category.Id} req.query.id [Recibe el id de la categoria a consultar]
 * @return {JSON_Response:Models.Category}  [Retorna una respuesta http en formato JSON con la categoria encontrada]
 * @author Isaac
 */
categoryController.getById = async (req, res, next, isCtrlr = false) => {
    try {
        const result = await Category.findById(req.query.id)
        return isCtrlr ? result : res.status(200).json({ ok: true, result });
    } catch (error) {
        res.status(500).json({ ok: false, msg: `Error Category.Controller GetByID module ${error.message}` })
    }
}

/**
 * Método que permite consultar en Base de Datos todas las categorias
 * @param  {} null [Sin parametros]
 * @return {JSON_Response:[Models.Category]}  [Retorna una respuesta http en formato JSON con la lista de categorias encontradas]
 * @author Isaac
 */
categoryController.getAll = async (req, res, next, isCtrlr = false) => {
    try {
        const result = await Category.find()
        return isCtrlr ? result : res.status(200).json({ ok: true, result })
    } catch (error) {
        res.status(500).json({ ok: false, msg: `Error Category.Controller GetALL module ${error.message}` })
    }
}

/**
 * Método que permite crear una nueva categoria en base de Datos
 * @param  {Models.Category} req.body [Modelo de la categoria a crear]
 * @return {JSON Response}  [Retorna una respuesta http en formato JSON]
 * @author Isaac
 */
categoryController.create = async (req, res, next, isCtrlr = false) => {
    const newCategory = new Category({
        name: req.body.name
    })
    try {
        await newCategory.save()
        return res.status(200).json({
            ok: true,
            msg: `The category ${newCategory.name} has been registered successfully`,
            newCategory
        })
    } catch (error) {
        res.status(500).json({ ok: false, msg: `Error Category.Controller Create module ${error.message}` })
    }
}

/**
 * Método que permite actualizar una categoria por medio del ID y campos a modificar
 * @param  {Models.Category : Models.Category.id} req.body:req.query [Modeo de la categoria y id categoria a actualizar]
 * @return {JSON Response}  [Retorna una respuesta http en formato JSON]
 * @author Isaac
 */
categoryController.update = async (req, res, next, isCtrlr = false) => {
    const newCategory = new Category({
        _id: req.query.id,
        name: req.body.name
    })
    try {
        const oldCategory = await Category.findById(req.query.id)
        await Category.findByIdAndUpdate(req.query.id, { $set: newCategory }, { new: true })

        return res.status(200).json({ ok: true, msg: `The category ${oldCategory.name} has been updated successfully` })
    } catch (error) {
        res.status(500).json({ ok: false, msg: `Error Category.Controller Update module ${error.message}` })
    }
}

/**
 * Método que permite actualizar el status de una categoria por medio del ID
 * @param  {Models.Category.status : Models.Category.id} req.body:req.query [Nuevo status de la categoria y ID de categoria a actualizar]
 * @return {JSON Response}  [Retorna una respuesta http en formato JSON]
 * @author Isaac
 */
categoryController.updateStatus = async (req, res, next, isCtrlr = false) => {
    try {
        const category = await Category.findByIdAndUpdate(req.query.id, { $set: { active: req.query.active } }, { new: true });
        if (!category) {
            return res.status(400).json({
                ok: false,
                msg: `The category you are trying ${req.query.active === 'true' ? 'enable' : 'disable'} does not exist`
            })
        }
        return res.status(200).json({
            ok: true,
            msg: `The category has been successfully ${req.query.active === 'true' ? 'enabled' : 'disabled'}`
        });
    } catch (error) {
        res.status(500).json({ ok: false, msg: `Error Category.Controller UpdateStatus module ${error.message}` })
    }
}

/**
 * Método que permite eliminar una categoria de Base de datos por medio del ID
 * @param  {Models.Category.id} req.body [ID de la categoria a eliminar]
 * @return {JSON Response}  [Retorna una respuesta http en formato JSON]
 * @author Isaac
 */
categoryController.delete = async (req, res, next, isCtrlr = false) => {
    try {
        const categoryRemoved = await Category.findByIdAndDelete(req.query.id)
        return res.status(200).json({
            ok: true,
            msg: `The category ${categoryRemoved.name} has been successfully removed`
        })
    } catch (error) {
        res.status(500).json({ ok: false, msg: `Error Category.Controller Delete module ${error.message}` })
    }
}

module.exports = categoryController