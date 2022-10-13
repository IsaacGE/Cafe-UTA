const carousel = require('../public/js/content/carousel')

const viewsController = {}

viewsController.homeView = (req, res) => {
    res.render('index', {
        carouselItems: carousel
    })
}

viewsController.productsView = (req, res) => {
    res.render('products')
}

viewsController.categoryView = (req, res) => {
    res.render('categories')
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