const express = require('express')
const router = express.Router()
const sessionValidation = require('../middlewares/sessionValidator')

const viewsController = require('../controllers/views.controller')

router.get('/', viewsController.homeView)

router.get('/products', viewsController.productsView)

router.get('/productsByCategory', viewsController.productsByCategoryView)

router.get('/users', [sessionValidation.AdminPermisionValidation], viewsController.usersView)

router.get('/shoppingCart', [sessionValidation.ValidateSession, sessionValidation.ClientPermisionValidation], viewsController.shoppingCartView)

router.get('/signIn', [sessionValidation.ValidateSessionForLogin], viewsController.signInView)

router.get('/categories', viewsController.categoryView)

router.get('/dashboard', [sessionValidation.EmployeePermisionValidation], viewsController.dashboardView)

router.get('/createUpdateProductForm', [sessionValidation.EmployeePermisionValidation], viewsController.createUpdateProductFormView)

router.get('/createUpdateUserForm', [sessionValidation.AdminPermisionValidation], viewsController.createUpdateUserFormView)

module.exports = router