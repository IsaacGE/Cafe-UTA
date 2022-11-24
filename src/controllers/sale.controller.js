const Sale = require('../models/sales.model')

const saleController = {}

// saleController.getById = async (req, res, next, isCtrlr = false) => {
//     try {
//         const result = await Sale.findById(req.query.id)
//         return isCtrlr ? result : res.status(200).json({ok: true, result});
//     } catch (error) {
//         res.status(500).json({ ok: false, msg: `Error Sale.Controller GetByID module ${error.message}` })
//     }
// }

// saleController.getByUserId = async (req, res, next, isCtrlr = false) => {
//   try {
//       const result = await Sale.find({ buyerUser: req.body.idUser })
//       return isCtrlr ? result : res.status(200).json({ok: true, result});
//   } catch (error) {
//       res.status(500).json({ ok: false, msg: `Error Sale.Controller GetByUserId module ${error.message}` })
//   }
// }

saleController.getAll = async (req, res, next, isCtrlr = false) => {

    try {
        const result = await Sale.find().populate({ path: 'productsList', model: 'Product' })
        if (!isCtrlr) return res.status(200).json({ ok: true, result })
        return result
    } catch (error) {
        return isCtrlr ? error : res.status(500).json({ ok: false, msg: `Error Product.Controller GetAll module ${error.message}` })
        res.status(500).json({ ok: false, msg: `Error Sale.Controller GetAll module ${error.message}` })
    }
}




saleController.create = async (req, res, next, isCtrlr = false) => {
    let buyerUser = req.body.buyerUser;

    const newSale = new Sale({
        productsList: req.body.productsList,
        totalSale: req.body.totalSale,
        saleEmployee: req.body.saleEmployee,
        buyerUser
    })

    
    try {

        const sale = await Sale.findOne({buyerUser:req.body.buyerUser})

        if(sale) {
            await Sale.updateOne({buyerUser:req.body.buyerUser},{$set:{totalSale: req.body.totalSale} ,$push:{productsList:newSale.productsList}})
            
        }else{
            await newSale.save()
        }
        return res.status(200).json({
            ok: true,
            msg: `se agrego correctamente`,
            newSale
        })
    } catch (error) {
        res.status(500).json({ ok: false, msg: `Error Sale.Controller Create module ${error.message}` })
    }
}


saleController.delete = async (req, res, next, isCtrlr = false) => {
    try {
        
        await Sale.findOneAndUpdate({buyerUser:req.query.buyerUser},{$set:{totalSale: req.body.totalSale}, $pull:{productsList:req.body.idProduct}})
        return res.json({
            ok: true,
            msg: `The product have been successfully removed`
        })
    } catch (error) {
        res.status(500).json({ ok: false, msg: error })
    }
}

saleController.saleCheck = async (req, res, next, isCtrlr = false) => {
    try {
        
        await Sale.findOneAndUpdate({buyerUser:req.query.buyerUser},{$set:{sale: req.query.saleCheck}})
        return res.json({
            ok: true,
            msg: `The buy have been confirmed`
        })
    } catch (error) {
        res.status(500).json({ ok: false, msg: error })
    }
}


module.exports = saleController