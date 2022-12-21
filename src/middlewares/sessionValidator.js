const User = require('../models/user.model')

const sessionValidation = {}

sessionValidation.ValidateSession = async (req, res, next, isCrudAction = false) => {
  if (req.session.userSession) {
    const userDB = await User.findById(req.session.userSession.id)
    if (userDB) return next()
  }
  return isCrudAction ? res.status(440).json({
    ok: false,
    msg: `La sesion ha expirado o no se ha iniciado una sesión.\nInicia sesión`
  }) : res.redirect('/signIn')
}

sessionValidation.ValidateSessionForLogin = async (req, res, next) => {
  if (req.session.userSession) {
    const userDB = await User.findById(req.session.userSession.id)
    if (userDB) return res.redirect('/')
  }
  next()
}


sessionValidation.AdminPermisionValidation = async (req, res, next, isCtrlr = true) => {
  if (req.session.userSession) {
    const userDB = await User.findById(req.session.userSession.id).populate({ path: 'role', model: 'Roles' })
    if (userDB.role.name == 'Administrador') return next()
  }
  return isCtrlr ? res.redirect('/') : res.status(401).json({ ok: false, msg: `¡No tienes permisos para realizar esta acción!` })
}


sessionValidation.EmployeePermisionValidation = async (req, res, next) => {
  if (req.session.userSession) {
    const userDB = await User.findById(req.session.userSession.id).populate({ path: 'role', model: 'Roles' })
    if (userDB.role.name == 'Empleado' || userDB.role.name == 'Administrador') return next()
    return res.status(401).json({
      ok: false,
      msg: `¡No tienes permisos para realizar esta acción!`
    })
  }
}

sessionValidation.ClientPermisionValidation = async (req, res, next, isCtrlr = false) => {
  if (req.session.userSession) {
    const userDB = await User.findById(req.session.userSession.id).populate({ path: 'role', model: 'Roles' })
    if (userDB.role.name == 'Cliente') return next()
    return !isCtrlr ? res.redirect('/') : res.status(401).json({
      ok: false,
      msg: `¡Solo los clientes pueden hacer compras!`
    })
  }
}

module.exports = sessionValidation