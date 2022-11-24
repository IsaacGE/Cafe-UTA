const express = require("express")
const router = express.Router()
const sales = require('../controllers/sale.controller')
const verifyId = require('../middlewares/verifyId')


router.post("/addSale",sales.create)
router.get("/getAll",sales.getAll)
router.put("/deleteProducto",sales.delete)
router.put("/saleCheck",sales.saleCheck)


module.exports = router