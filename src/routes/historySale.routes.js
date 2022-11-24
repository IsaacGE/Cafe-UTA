const express = require("express")
const router = express.Router()
const historySale = require('../controllers/historySale.controller')


router.post("/addHistorySale",historySale.create)
router.get("/getAll",historySale.getAll)



module.exports = router