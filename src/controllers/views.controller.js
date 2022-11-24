const carousel = require('../public/js/content/carousel')
const Product = require('./product.controller')
const category = require('./category.controller')
const Sale = require('./sale.controller')
const User = require('./user.controller')
const Role = require('../models/role.model')

const viewsController = {}

viewsController.homeView = (req, res) => {
    res.render('index', {
        carouselItems: carousel
    })
}

viewsController.productsView = async (req, res) => {
    var products = await Product.getAll(null, null, null, true)
    res.render('products', {
        productsList: products
    })
}

viewsController.categoryView = async (req, res) => {
    res.render('categories')
}
viewsController.graficasView = (req, res) => {
    res.render('graficas')
}

viewsController.signInView = (req, res) => {
    console.log(req.session.userSession)
    res.render('signIn')
   
}

viewsController.signUpView = (req, res) => {
    res.render('signUp')
}

viewsController.usersView = async (req, res) => {
    var users = await User.getAll(null, null, null, true)
    res.render('users', {
        usersList: users
    })
}

viewsController.shoppingCartView = async (req, res) => {
    var shopp =  await Sale.getAll(null, null, null, true)
    res.render('shopCart', {
        shoppingHist: shopp
    })
}


// RENDER FORMS VIEWS //
viewsController.createUpdateProductFormView = async (req, res) => {
    var categories = await category.getAll(null, null, null, true)
    var product = req.query.id ? await Product.getById(req, null, null, true) : []
    res.render('partials/forms/createUpdateProduct', {
        categoriesList: categories,
        product
    })
}

viewsController.createUpdateUserFormView = async (req, res) => {
    var roles = await Role.find()
    var user = req.query.id ? await User.getById(req, null, null, true) : []
    res.render('partials/forms/createUpdateUser', {
        rolesList: roles,
        user
    })
}

module.exports = viewsController