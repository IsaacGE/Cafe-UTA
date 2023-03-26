const mongoose = require("mongoose");
require('../config/config')
const startUp = require('../helpers/startUp.helper')

mongoose.connect(process.env.URLDB, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
},
    (err, resp) => {
        if (err) throw `DataBase connection ERROR: ${err}`;
        startUp.createCategories()
        startUp.createAdmin()
        startUp.createOrderStatus()
        console.log('DataBase Connection:', process.env.URLDB);
    });

module.exports = mongoose
