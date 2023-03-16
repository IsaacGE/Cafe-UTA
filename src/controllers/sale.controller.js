const Sale = require('../models/sales.model')
const OrderStatus = require('../models/orderStatus.model')

const saleController = {}

saleController.getById = async (req, res, next, isCtrlr = false) => {
    try {
        const result = await Sale.findById(req.query.id)
        return isCtrlr ? result : res.status(200).json({ ok: true, result });
    } catch (error) {
        res.status(500).json({ ok: false, msg: `Error Sale.Controller GetByID module ${error.message}` })
    }
}

saleController.getByUserId = async (req, res, next, isCtrlr = false) => {
    try {
        const result = await Sale.find({ buyerUser: req.session.userSession.id }).populate({ path: 'saleStatus', model: 'OrderStatus' })
        return isCtrlr ? result : res.status(200).json({ ok: true, result });
    } catch (error) {
        res.status(500).json({ ok: false, msg: `Error Sale.Controller GetByUserId module ${error.message}` })
    }
}

saleController.getPendingOrder = async (req, res, next, isCtrlr = false) => {
    try {
        const orderStatusPendindg = await OrderStatus.findOne({ key: 'EE' })
        const result = await Sale.findOne({ saleStatus: orderStatusPendindg._id, buyerUser: req.session.userSession.id }).populate({ path: 'productList', model: 'Product' })
        return isCtrlr ? result : res.status(200).json({ ok: true, result });
    } catch (error) {
        res.status(500).json({ ok: false, msg: `Error Sale.Controller GetByUserId module ${error.message}` })
    }
}

saleController.getAll = async (req, res, next, isCtrlr = false) => {
    try {
        const result = await Sale.find()
        return isCtrlr ? result : res.status(200).json({ ok: true, result });
    } catch (error) {
        res.status(500).json({ ok: false, msg: `Error Sale.Controller GetAll module ${error.message}` })
    }
}

saleController.createOrUpdate = async (req, res, next, isCtrlr = false) => {
    var responseMsg = ''
    const orderStatus = await OrderStatus.findOne({ key: 'EE' })
    const newSale = new Sale({
        totalSale: req.body.totalSale,
        buyerUser: req.session.userSession.id,
        saleStatus: orderStatus._id
    })
    newSale.productList.push(req.body.productList)
    try {
        const currentCart = await Sale.findOne({ buyerUser: req.session.userSession.id, saleStatus: orderStatus.id })
        if (currentCart) {
            currentCart.productList.push(req.body.productList)                          /**En productList se envia desde Ajax solo un producto (se puede adaptar para recibir la lista) */
            currentCart.totalSale = currentCart.totalSale + (req.body.totalSale * 1)    /**En TotalSale se envia el precio del producto agregado al carrito */
            await currentCart.save()
            responseMsg = '¡Se ha agregado el producto al carrito exitosamente!'
        } else {
            await newSale.save()
            responseMsg = '¡Se ha creado tu carrito exitosamente!\n¡Agrega más productos!'
        }
        return res.status(200).json({
            ok: true,
            msg: responseMsg
        })
    } catch (error) {
        res.status(500).json({ ok: false, msg: `Error Sale.Controller CreateOrUpdate Module ${error.message}` })
    }
}

saleController.deleteProduct = async (req, res, next, isCtrlr = false) => {
    try {
        const orderStatus = await OrderStatus.findOne({ key: 'EE' })
        const orderPending = await Sale.findOne({ saleStatus: orderStatus._id, buyerUser: req.session.userSession.id }).populate({ path: 'productList', model: 'Product' })
        var message = ''
        if (orderPending && orderPending.productList.length == 1) {
            await Sale.findByIdAndDelete(orderPending._id)
            message = '¡Se ha eliminado tu carrito de compras.!'
        }
        else {
            message = '¡Se ha eliminado el producto del carrito exitosamente.!'
            await Sale.findOneAndUpdate({ saleStatus: orderStatus.id, buyerUser: req.session.userSession.id }, { $set: { totalSale: req.body.totalNewSale }, $pull: { productList: req.query.id } })
        }
        return res.status(200).json({
            ok: true,
            msg: message
        })
    } catch (error) {
        res.status(500).json({ ok: false, msg: `Error Sale.Controller delete module ${error.message}` })
    }
}

saleController.updateStatus = async (req, res, next, isCtrlr = false) => {
    try {
        const orderStatus = await OrderStatus.findOne({ key: req.body.newStatus })
        console.log(orderStatus)
        await Sale.findByIdAndUpdate(req.query.id, { $set: { saleStatus: orderStatus.id } })
        return res.status(200).json({
            ok: true,
            msg: `!Se ha ${req.body.newOrderMsg} exitosamente¡`
        })
    } catch (error) {
        res.status(500).json({ ok: false, msg: `Error Sale.Controller UpdateStatus module ${error.message}` })
    }
}

module.exports = saleController