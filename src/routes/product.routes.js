const express = require("express")
const router = express.Router()
const verifyId = require('../middlewares/verifyId')
const product = require('../controllers/product.controller')
const sessionValidator = require('../middlewares/sessionValidator')

router.get("/getAll", [sessionValidator.ValidateSession], product.getAll)

router.post("/create", [sessionValidator.ValidateSession], product.create)

router.get("/getById", [sessionValidator.ValidateSession, verifyId.ckeckID], product.getById)

router.put("/update", [sessionValidator.ValidateSession, verifyId.ckeckID], product.update)

router.put('/updateStatus', [sessionValidator.ValidateSession, verifyId.ckeckID], product.updateStatus)

router.delete("/delete", [sessionValidator.ValidateSession, verifyId.ckeckID], product.delete)

module.exports = router
