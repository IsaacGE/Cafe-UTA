const Router = require('express')
const router = Router()
const authController = require('../controllers/auth.controller')
const verifySignup = require('../middlewares/verifyCreateUser')

router.post("/signup", [verifySignup.isEmailAvailable, verifySignup.isMatriculaAvailable],
    authController.signUp
)
  
router.post("/signin", authController.signIn)
  

module.exports = router