$('#btnSignIn').on('click', () => {
  $('#containerAuthForms').hide()
  $('#loaderSpinner').show()
  var data = {email: $('#idOrEmail').val(), pass: $('#password').val()}
  $.ajax({
    method: "post",
    url: `${localUri}/auth/signin`,
    data: data
  })
  .done((response) => {
    showSimpleAlertMessage("!Has iniciado sesión con éxito¡", 'success')
  })
  .fail((response) => {
    showSimpleAlertMessage("Credenciales incorrectas", 'error')
  })
  $('#loaderSpinner').hide()
  $('#containerAuthForms').show()
})


$('#btnSignUp').on('click', () => {
  var data = {
    name: $('#name').val(),
    email: $('#email').val(),
    imageUrl: "",
    matricula: $('#matricula').val(),
    pass: $('#newPassword').val(),
    role: 'client'
  }
  $.ajax({
    method: "post",
    url: `${localUri}/auth/signup`,
    data: data
  })
  .done((response) => {
    showSimpleAlertMessage("!Ahora eres parte de Cafe-UTA¡", 'success')
  })
  .fail((response) => {
    showSimpleAlertMessage("!No se ha registrado tu cuenta¡", 'error')
  })
})


//Validate if input is emial
function isEmail(text) {
  if(text.length > 6 && text.includes('@')) return true
  return false
}