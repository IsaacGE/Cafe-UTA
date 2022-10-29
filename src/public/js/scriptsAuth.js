//SignIn method request //
$('#btnSignIn').on('click', () => {
  $('#containerAuthForms').hide()
  $('#loaderSpinner').show()
  var password = $('#password').val()
  var idOrEmail = $('#idOrEmail').val()
  var data = { emailOrId: idOrEmail, pass: password }
  $.ajax({
    method: "post",
    url: `${localUri}/auth/signin`,
    data: data
  })
    .done(response => {
      showToastAlert(response.msg, 'success')
    })
    .fail(response => {
      if (response.status == 500) {
        showCustomSmallAlert(response.responseJSON.msg, 'Error en el servidor', 'arrow-counterclockwise', 'Cerrar')
      } else showToastAlert(response.responseJSON.msg, 'error')
    })
  $('#loaderSpinner').hide()
  $('#containerAuthForms').show()
})
// ------ //


// SingUP Method reuest //
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
      showToastAlert(response.msg, 'success')
    })
    .fail((response) => {
      if (response.status == 500) {
        showCustomSmallAlert(response.responseJSON.msg, 'Error en el servidor', 'arrow-counterclockwise', 'Cerrar')
      } else showToastAlert(response.responseJSON.msg, 'error')
    })
})
//--------//


//Validate if input is emial
function isEmail(text) {
  if (text.length > 6 && text.includes('@')) return true
  return false
}





$(document).ready(() => {
  $('.change-form-box').click(() => {
    $('input').val('')
  })
  //Script para la pagina(vista login)
  //Ejecutando funciones
  document.getElementById("btn__iniciar-sesion").addEventListener("click", iniciarSesion);
  document.getElementById("btn__registrarse").addEventListener("click", register);
  window.addEventListener("resize", anchoPage);

  //Declarando variables
  var formulario_login = document.querySelector(".formulario__login");
  var formulario_register = document.querySelector(".formulario__register");
  var contenedor_login_register = document.querySelector(".contenedor__login-register");
  var caja_trasera_login = document.querySelector(".caja__trasera-login");
  var caja_trasera_register = document.querySelector(".caja__trasera-register");

  //FUNCIONES

  function anchoPage() {

    if (window.innerWidth > 850) {
      caja_trasera_register.style.display = "block";
      caja_trasera_login.style.display = "block";
    } else {
      caja_trasera_register.style.display = "block";
      caja_trasera_register.style.opacity = "1";
      caja_trasera_login.style.display = "none";
      formulario_login.style.display = "block";
      contenedor_login_register.style.left = "0px";
      formulario_register.style.display = "none";
    }
  }

  anchoPage();


  function iniciarSesion() {
    if (window.innerWidth > 850) {
      formulario_login.style.display = "block";
      contenedor_login_register.style.left = "10px";
      formulario_register.style.display = "none";
      caja_trasera_register.style.opacity = "1";
      caja_trasera_login.style.opacity = "0";
    } else {
      formulario_login.style.display = "block";
      contenedor_login_register.style.left = "0px";
      formulario_register.style.display = "none";
      caja_trasera_register.style.display = "block";
      caja_trasera_login.style.display = "none";
    }
  }

  function register() {
    if (window.innerWidth > 850) {
      formulario_register.style.display = "block";
      contenedor_login_register.style.left = "410px";
      formulario_login.style.display = "none";
      caja_trasera_register.style.opacity = "0";
      caja_trasera_login.style.opacity = "1";
    } else {
      formulario_register.style.display = "block";
      contenedor_login_register.style.left = "0px";
      formulario_login.style.display = "none";
      caja_trasera_register.style.display = "none";
      caja_trasera_login.style.display = "block";
      caja_trasera_login.style.opacity = "1";
    }
  }
})