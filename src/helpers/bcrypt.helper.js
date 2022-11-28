const bcrypt = require('bcrypt')

const passHash = {}

passHash.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt);
}
  
passHash.comparePassword = async (password, inputPassword) => {
    return await bcrypt.compare(password, inputPassword)
}

module.exports = passHash