const carousel = require('../public/js/content/carousel')
const product = require('../controllers/product.controller')
const category = require('../controllers/category.controller')


const viewsController = {}

viewsController.homeView = (req, res) => {
    res.render('index', {
        carouselItems: carousel
    })
}

viewsController.productsView = async (req, res) => {
    var products = await product.getAll(null, null, null, true)
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
    res.render('signIn')
   
}

viewsController.signUpView = (req, res) => {
    res.render('signUp')
}

viewsController.usersView = (req, res) => {
    res.render('users')
}

viewsController.shoppingCartView = (req, res) => {
    res.render('shopCart')
}


// RENDER FORMS VIEWS //
viewsController.newProductFormView = async (req, res) => {
    var categories = await category.getAll(null, null, null, true)
    res.render('partials/forms/newProduct', {
        categoriesList: categories
    })
}

module.exports = viewsController