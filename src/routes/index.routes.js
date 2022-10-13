const express = require('express')
const app = express()

const viewsPath = __dirname.replace('/routes', '/views')

app.set('views', viewsPath)

app.use(require('./views.routes'))

app.use('/auth', require('./auth.routes'))

app.use('/users', require('./user.routes'))

app.use('/category', require('./category.routes'))

app.use('/products', require('./product.routes'))

module.exports = app