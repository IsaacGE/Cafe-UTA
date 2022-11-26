const historySale = require('../models/historySale.model')

const historySaleController = {}


historySaleController.getAll = async (req, res, next, isCtrlr = false) => {

    try {
        const result = await historySale.find().populate({ path: 'productsList', model: 'Product' })
        if (!isCtrlr) return res.status(200).json({ ok: true, result })
        return result
    } catch (error) {
        return isCtrlr ? error : res.status(500).json({ ok: false, msg: `Error Product.Controller GetAll module ${error.message}` })
    }
}




historySaleController.create = async (req, res, next, isCtrlr = false) => {
    let buyerUser = req.body.buyerUser;

    const newSale = new historySale({
        productsList: req.body.productsList,
        totalSale: req.body.totalSale,
        buyerUser
    })

    
    try {

        const sale = await historySale.findOne({buyerUser:req.body.buyerUser})

        if(sale) {
            await historySale.updateOne({buyerUser:req.body.buyerUser},{$set:{totalSale: req.body.totalSale} ,$push:{productsList:{$each:newSale.productsList}}})
            
        }else{
            await newSale.save()
        }
        return res.status(200).json({
            ok: true,
            msg: `se agrego correctamente`,
            newSale
        })
    } catch (error) {
        res.status(500).json({ ok: false, msg: error })
    }
}

module.exports = historySaleController