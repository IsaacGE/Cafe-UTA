const carousel = require('../public/js/content/carousel')
const product = require('./product.controller')
const category = require('./category.controller')
const Sale = require('./sale.controller')


const viewsController = {}

viewsController.homeView = (req, res) => {
    res.render('index', {
        carouselItems: carousel
    })
}

viewsController.productsView = async (req, res) => {
    var products = await product.getAll(null, null, null, true)
    var [listProductos] =  await Sale.getAll(null, null, null, true)
    var {totalSale} = listProductos;
    res.render('products', {
        totalSale,
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

viewsController. shoppingCartView = async (req, res) => {
    var [products] =  await Sale.getAll(null, null, null, true)
    var {productsList} = products;
   
    res.render('shopCart', {
       
        infoGeneral:products,
        shoppinglist: productsList
    })
}


// RENDER FORMS VIEWS //
viewsController.newProductFormView = async (req, res) => {
    var categories = await category.getAll(null, null, null, true)
    res.render('partials/forms/newProduct', {
        categoriesList: categories
    })
}

viewsController.updateProductForm = async (req, res) => {
    var categories = await category.getAll(null, null, null, true)
    var productReq = await product.getById(req, null, null, true)
    res.render('partials/forms/updateProduct', {
        categoriesList: categories,
        productToUpdate: productReq
    })
}

module.exports = viewsController