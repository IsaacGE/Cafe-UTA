require('./database/db')
const express = require('express')
const session = require('cookie-session')
const startUp = require('./helpers/startUp.helper')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const path = require('path')

startUp.createCategories()
startUp.createRoles()
startUp.createAdmin()

app.use(cors())
app.use(morgan("dev"))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.set("views", path.join(__dirname, '/views'))
app.set("view engine", "ejs")
app.use('/assets', express.static(__dirname + '/public'))

app.use(session({
    secret: 'secretSessionWebStore',
    name: 'session',
    resave: true,
    saveUninitialized: true,
    expires: new Date(Date.now() + 18000)
}))

app.use((req, res, next) => {
    if (!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});

app.use(require('./routes/index.routes'))

module.exports = app