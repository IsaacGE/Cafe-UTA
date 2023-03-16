const express = require("express")
const router = express.Router()
const verifyCreate = require('../middlewares/verifyCreateUser')
const verifyUpdate = require('../middlewares/verifyUpdateUser')
const user = require('../controllers/user.controller')
const verifyId = require('../middlewares/verifyId')
const sessionValidator = require('../middlewares/sessionValidator')

router.get("/getAll", [sessionValidator.ValidateSession], user.getAll)

router.post("/create", [sessionValidator.ValidateSession, verifyCreate.isEmailAvailable, verifyCreate.isRoleValid], user.create)

router.get("/getById", [sessionValidator.ValidateSession, verifyId.ckeckID], user.getById)

router.put("/update", [sessionValidator.ValidateSession, verifyId.ckeckID, verifyUpdate.isEmailAvailable, verifyCreate.isRoleValid], user.update)

router.put('/updateStatus', [sessionValidator.ValidateSession, verifyId.ckeckID], user.updateStatus)

router.delete("/delete", [sessionValidator.ValidateSession, verifyId.ckeckID], user.delete)

module.exports = router
