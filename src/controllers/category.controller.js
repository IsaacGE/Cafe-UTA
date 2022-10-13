const Category = require('../models/category.model')

const categoryController = {}

categoryController.getById = async (req, res, next) => {
    try {
        const result = await Category.findById(req.query.id)
        res.json({ok: true, result});
    } catch (error) {
        res.status(500).json({ ok: false, msg: error })
    }
}

categoryController.getAll = async (req, res, next) => {
    try {
        const result = await Category.find()
        res.json({ok: true, result});
    } catch (error) {
        res.status(500).json({ ok: false, msg: error })
    }
}

categoryController.create = async (req, res, next) => {
    const newCategory = new Category({
        name: req.body.name
    })
    try {
        await newCategory.save()
        return res.json({
            ok: true,
            msg: `The category ${newCategory.name} has been registered successfully`,
            newCategory
        })
    } catch (error) {
        res.status(500).json({ ok: false, msg: error })
    }
}

categoryController.update = async (req, res, next) => {
    const newCategory = new Category({
        _id: req.query.id,
        name: req.body.name
    })
    try {
        const oldCategory = await Category.findById(req.query.id)
        await Category.findByIdAndUpdate(req.query.id, { $set: newCategory }, { new: true })

        return res.json({ok: true, msg: `The category ${oldCategory.name} has been updated successfully` })
    } catch (error) {
        res.status(500).json({ ok: false, msg: error })
    }
}

categoryController.updateStatus = async (req, res, next) => {
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
        res.status(500).json({ ok: false, msg: error })
    }
}

categoryController.delete = async (req, res, next) => {
    try {
        const categoryRemoved = await Category.findByIdAndDelete(req.query.id)
        return res.json({
            ok: true,
            msg: `The category ${categoryRemoved.name} has been successfully removed`
        })
    } catch (error) {
        res.status(500).json({ ok: false, msg: error })
    }
}

module.exports = categoryController