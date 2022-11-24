const express = require("express")
const router = express.Router()
const verifyCreate = require('../middlewares/verifyCreateUser')
const verifyUpdate = require('../middlewares/verifyUpdateUser')
const user = require('../controllers/user.controller')
const verifyId = require('../middlewares/verifyId')

router.get("/getAll", user.getAll)

router.post("/create", [verifyCreate.isEmailAvailable, verifyCreate.isRoleValid], user.create)

router.get("/getById", [verifyId.ckeckID], user.getById)

router.put("/update", [verifyId.ckeckID, verifyUpdate.isEmailAvailable, verifyCreate.isRoleValid], user.update)

router.put('/updateStatus', [verifyId.ckeckID], user.updateStatus)

router.delete("/delete", [verifyId.ckeckID], user.delete)

module.exports = router
