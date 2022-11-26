const bcrypt = require('bcrypt')

const passHash = {}

passHash.encryptPassword = (password) => {
    return bcrypt.hashSync(password, 10);
}
  
passHash.comparePassword = (password, inputPassword) => {
    return bcrypt.compare(password, inputPassword)
}

module.exports = passHash