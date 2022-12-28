const Sale = require('../models/sales.model')
const SaleStatus = require('../models/orderStatus.model')

const mdlwreCreateCart = {}

mdlwreCreateCart.userHasPendingCart = async (req, res, next) => {
    try {
        const pendingOrderId = await SaleStatus.findOne({ key: 'PE'  })
        const cart = await Sale.findOne({ buyerUser: req.session.userSession.id, saleStatus: pendingOrderId })
        if (cart) return res.status(400).json({
            ok: false,
            msg: 'Actualmente cuentas con un pedido por entregar, espera a que sea entregado'
        })
        next()
    } catch (error) {
        res.status(500).json({ ok: false, msg: `Error [CreateCart.Middleware validator] ${error.message}` })
    }
};



module.exports = mdlwreCreateCart