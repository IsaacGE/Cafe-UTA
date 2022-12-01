const express = require("express")
const router = express.Router()
const sales = require('../controllers/sale.controller')
const verifyId = require('../middlewares/verifyId')
const sessionValidation = require('../middlewares/sessionValidator')

router.get("/getAll", [sessionValidation.ValidateSession], sales.getAll)

router.post("/createOrUpdate", [sessionValidation.ValidateSession], sales.createOrUpdate)

router.get("/getById", [sessionValidation.ValidateSession,verifyId.ckeckID], sales.getById)

router.get("/getByUserId", [sessionValidation.ValidateSession, verifyId.ckeckID], sales.getByUserId)

router.get("/pendingOrder", [sessionValidation.ValidateSession], sales.getPendingOrder)

router.put("/deleteProduct", [verifyId.ckeckID], sales.deleteProduct)

router.put('/updateStatus', [sessionValidation.ValidateSession, verifyId.ckeckID], sales.updateStatus)

module.exports = router