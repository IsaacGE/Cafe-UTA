const Product = require('../models/product.model')

const productController = {}

productController.getAll = async (req, res, next) => {
    try {
        const result = await Product.find()
        return res.json({ok: true, result})
    } catch (error) {
        res.status(500).json({ ok: false, msg: error })
    }
}

productController.getById = async (req, res, next) => {
    try {
        const result = await Product.findById(req.params.id)
        res.json({ok: true, result});
    } catch (error) {
        res.status(500).json({ ok: false, msg: error })
    }
}

productController.create = async (req, res, next) => {
    const newProduct = new Product({
        name: req.body.name,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        stock: req.body.stock,
        category: req.body.category
    })
    try {
        await newProduct.save()
        return res.json({
            ok: true,
            msg: `The product ${newProduct.name} has been registered successfully`,
            newProduct
        })
    } catch (error) {
        res.status(500).json({ ok: false, msg: error })
    }
}

productController.update = async (req, res, next) => {
    const newProduct = new Product({
        _id: req.query.id,
        name: req.body.name,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        stock: req.body.stock,
        category: req.body.category
    })
    try {
        const oldProduct = await Product.findById(req.query.id)
        await Product.findByIdAndUpdate(req.params.id, { $set: newProduct }, { new: true })
        return res.json({ ok: true, msg: `The product ${oldProduct} has been updated successfully` })
    } catch (error) {
        res.status(500).json({ ok: false, msg: error })
    }
}

productController.updateStatus = async (req, res, next) => {
    try {
        const result = await Product.findByIdAndUpdate(req.query.id, { $set: { active: req.query.active } }, { new: true });
        if (!result) {
            return res.status(400).json({
                ok: false,
                msg: `The product you are trying ${req.query.active === 'true' ? 'enable' : 'disable'} does not exist`
            })
        }
        return res.status(200).json({
            ok: true,
            msg: `The product has been successfully ${req.query.active === 'true' ? 'enabled' : 'disabled'}`
        });
    } catch (error) {
        res.status(500).json({ ok: false, msg: error })
    }
}

productController.delete = async (req, res, next) => {
    try {
        const productRemoved = await Product.findByIdAndDelete(req.query.id)
        return res.json({
            ok: true,
            msg: `The product ${productRemoved.name} has been successfully removed`
        })
    } catch (error) {
        res.status(500).json({ ok: false, msg: error })
    }
}

module.exports = productController