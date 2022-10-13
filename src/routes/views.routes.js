const express = require('express')
const router = express.Router()

const viewsController = require('../controllers/views.controller')

router.get('/', viewsController.homeView)
router.get('/products', viewsController.productsView)
router.get('/users', viewsController.usersView)
router.get('/shoppingCart', viewsController.shoppingCartView)
router.get('/signIn', viewsController.signInView)
router.get('/signUp', viewsController.signUpView)
router.get('/categories', viewsController.categoryView)

module.exports = router