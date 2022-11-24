const express = require('express')
const router = express.Router()

const viewsController = require('../controllers/views.controller')

router.get('/', viewsController.homeView)
router.get('/products', viewsController.productsView)
router.get('/users', viewsController.usersView)
router.get('/shopCart', viewsController.shoppingCartView)
router.get('/signIn', viewsController.signInView)
router.get('/signUp', viewsController.signUpView)
router.get('/categories', viewsController.categoryView)
router.get('/graficas', viewsController.graficasView)
router.get('/newProductForm', viewsController.newProductFormView)
router.get('/updateProductForm', viewsController.updateProductForm)

module.exports = router