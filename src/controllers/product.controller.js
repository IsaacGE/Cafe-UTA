const Product = require('../models/product.model')

const productController = {}

productController.getAll = async (req, res, next, isCtrlr = false) => {
    try {
        const result = await Product.find().populate({ path: 'Category', model: 'Categories' })
        if (!isCtrlr) return res.status(200).json({ ok: true, result })
        return result
    } catch (error) {
        return isCtrlr ? error : res.status(500).json({ ok: false, msg: `Error Product.Controller GetAll module ${error.message}` })
    }
}

productController.getById = async (req, res, next, isCtrlr = false) => {
    try {
        const result = await Product.findById(req.query.id)
        return isCtrlr ? result : res.status(200).json({ ok: true, result });
    } catch (error) {
        res.status(500).json({ ok: false, msg: `Error Product.Controller GetByID module ${error.message}` })
    }
}

productController.create = async (req, res, next, isCtrlr = false) => {
    const newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        stock: req.body.stock,
        Category: req.body.idCategory
    })
    try {
        await newProduct.save()
        return res.status(200).json({
            ok: true,
            msg: `The product ${newProduct.name} has been registered successfully`,
            newProduct
        })
    } catch (error) {
        res.status(500).json({ ok: false, msg: `Error Product.Controller Create module ${error.message}` })
    }
}

productController.update = async (req, res, next, isCtrlr = false) => {
    const newProduct = new Product({
        _id: req.query.id,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        stock: req.body.stock,
        Category: req.body.idCategory
    })
    try {
        const oldProduct = await Product.findById(req.query.id)
        await Product.findByIdAndUpdate(req.query.id, { $set: newProduct }, { new: true })
        return res.status(200).json({ ok: true, msg: `The product ${oldProduct.name} has been updated successfully` })
    } catch (error) {
        res.status(500).json({ ok: false, msg: `Error Product.Controller Update module ${error.message}` })
    }
}

productController.updateStatus = async (req, res, next, isCtrlr = false) => {
    try {
        const result = await Product.findByIdAndUpdate(req.query.id, { $set: { active: req.body.active } }, { new: true });
        if (!result) {
            return res.status(400).json({
                ok: false,
                msg: `The product you are trying ${req.body.active == 'true' ? 'enable' : 'disable'} does not exist`
            })
        }
        return res.status(200).json({
            ok: true,
            msg: `The product has been successfully ${req.body.active == 'true' ? 'enabled' : 'disabled'}`
        });
    } catch (error) {
        res.status(500).json({ ok: false, msg: `Error Product.Controller UpdateStatus module ${error.message}` })
    }
}

productController.delete = async (req, res, next, isCtrlr = false) => {
    try {
        const productRemoved = await Product.findByIdAndDelete(req.query.id)
        return res.status(200).json({
            ok: true,
            msg: `The product ${productRemoved.name} has been successfully removed`
        })
    } catch (error) {
        res.status(500).json({ ok: false, msg: `Error Product.Controller Delete module ${error.message}` })
    }
}

module.exports = productController