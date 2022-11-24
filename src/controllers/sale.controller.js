const Sale = require('../models/sales.model')

const saleController = {}

saleController.getById = async (req, res, next, isCtrlr = false) => {
    try {
        const result = await Sale.findById(req.query.id)
        return isCtrlr ? result : res.status(200).json({ok: true, result});
    } catch (error) {
        res.status(500).json({ ok: false, msg: `Error Sale.Controller GetByID module ${error.message}` })
    }
}

saleController.getByUserId = async (req, res, next, isCtrlr = false) => {
  try {
      const result = await Sale.find({ buyerUser: req.body.idUser })
      return isCtrlr ? result : res.status(200).json({ok: true, result});
  } catch (error) {
      res.status(500).json({ ok: false, msg: `Error Sale.Controller GetByUserId module ${error.message}` })
  }
}

saleController.getAll = async (req, res, next, isCtrlr = false) => {
    try {
        const result = await Sale.find()
        return isCtrlr ? result : res.status(200).json({ok: true, result});
    } catch (error) {
        res.status(500).json({ ok: false, msg: `Error Sale.Controller GetAll module ${error.message}` })
    }
}

saleController.create = async (req, res, next, isCtrlr = false) => {
    const newSale = new Sale({
        productsList: req.body.productsList,
        totalSale: req.body.totalSale,
        saleEmployee: req.body.saleEmployee,
        buyerUser: req.body.buyerUser
    })
    try {
        await newSale.save()
        return res.status(200).json({
            ok: true,
            msg: `the purchase has been made correctly`,
            newSale
        })
    } catch (error) {
        res.status(500).json({ ok: false, msg: `Error Sale.Controller Create module ${error.message}` })
    }
}

module.exports = saleController