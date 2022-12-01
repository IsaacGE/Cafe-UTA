const express = require('express')
const app = express()

app.use('/', require('./views.routes'))

app.use('/auth', require('./auth.routes'))

app.use('/users', require('./user.routes'))

app.use('/category', require('./category.routes'))

app.use('/products', require('./product.routes'))

app.use('/sales', require('./sales.routes'))

module.exports = app