const express = require("express")
const router = express.Router()
const category = require('../controllers/category.controller')
const verifyId = require('../middlewares/verifyId')
const sessionValidator = require('../middlewares/sessionValidator')

router.get("/getAll", [sessionValidator.ValidateSession], category.getAll)

router.post("/create", [sessionValidator.ValidateSession], category.create)

router.get("/getById", [sessionValidator.ValidateSession, verifyId.ckeckID], category.getById)

router.put("/update", [sessionValidator.ValidateSession, verifyId.ckeckID], category.update)

router.put('/updateStatus', [sessionValidator.ValidateSession, verifyId.ckeckID], category.updateStatus)

router.delete("/delete", [sessionValidator.ValidateSession, verifyId.ckeckID], category.delete)

module.exports = router
