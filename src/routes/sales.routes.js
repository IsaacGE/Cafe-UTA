const express = require("express")
const router = express.Router()
const sales = require('../controllers/sale.controller')
const verifyId = require('../middlewares/verifyId')

router.get("/getAll", sales.category)

router.post("/create", category.create)

router.get("/getById", [verifyId.ckeckID], category.getById)

router.put("/update", [verifyId.ckeckID], category.update)

router.put('/updateStatus', [verifyId.ckeckID], category.updateStatus)

router.delete("/delete", [verifyId.ckeckID], category.delete)

module.exports = router