const User = require('../models/user.model')
const Category = require('../models/category.model')
const encrypt = require('./bcrypt.helper')

const startUp = {}

startUp.createAdmin = async () => {
    try {
        const user = await User.findOne({ email: "admin.cafeUTA@utags.com" })
        if (!user) {
            await User.create({
                completeName: "Administrator CafeUTA",
                matricula: '000000',
                email: "admin.cafeUTA@utags.com",
                password: await encrypt.encryptPassword("4dM1n-W3b$t0re"),
                imageUrl: "https://www.pngmart.com/files/21/Admin-Profile-PNG-Clipart.png",
                role: 'admin'
            });
            console.log('Admin User Created!')
        }
    } catch (error) {
        throw error
    }
}


startUp.createCategories = async () => {
    try {
        categoriesList.forEach(async category => {
            const categoryReg = await Category.findOne({ name: category.name })
            if (!categoryReg) { await Category.create({ name: category.name }) }
        })
    } catch (error) {
        throw error
    }
}


const categoriesList = [
    { name: 'Bebidas' },
    { name: 'Postres' },
    { name: 'Platillos' },
    { name: 'Desayunos' },
    { name: 'Botanas' },
    { name: 'Dulces' },
    { name: 'Combos' }
]

module.exports = startUp