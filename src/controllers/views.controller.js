const carousel = require('../public/js/content/carousel')
const product = require('../controllers/product.controller')


const viewsController = {}

viewsController.homeView = (req, res) => {
    res.render('index', {
        carouselItems: carousel
    })
}

<<<<<<< HEAD
viewsController.productsView = (req, res) => {
    
    res.render('products')
=======
viewsController.productsView = async (req, res) => {
    var products = await product.getAll(null, null, null, true)
    res.render('products', {
        productsList: products
    })
>>>>>>> f50c0d9e3979707046628d814b65acb171768a25
}

viewsController.categoryView = (req, res) => {
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

module.exports = viewsController