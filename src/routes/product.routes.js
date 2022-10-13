const express = require("express")
const router = express.Router()
const verifyId = require('../middlewares/verifyId')
const product = require('../controllers/product.controller')

router.get("/getAll", product.getAll)

router.post("/create", product.create)

router.get("/getById", [verifyId.ckeckID], product.getById)

router.put("/update", [verifyId.ckeckID], product.update)

router.put('/updateStatus', [verifyId.ckeckID], product.updateStatus)

router.delete("/delete", [verifyId.ckeckID], product.delete)

module.exports = router
