const express = require("express")
const router = express.Router()
const verifySignup = require('../middlewares/verifyCreateUser')
const verifyUpdate = require('../middlewares/verifyUpdateUser')
const user = require('../controllers/user.controller')
const verifyId = require('../middlewares/verifyId')

router.get("/getAll", user.getAll)

router.post("/create", [verifySignup.isEmailAvailable, verifySignup.isRoleValid], user.create)

router.get("/getById", [verifyId.ckeckID], user.getById)

router.put("/update", [verifyId.ckeckID, verifyUpdate.isEmailAvailable, verifyUpdate.isRoleValid], user.update)

router.put('/updateStatus', [verifyId.ckeckID], user.updateStatus)

router.delete("/delete", [verifyId.ckeckID], user.delete)

module.exports = router
