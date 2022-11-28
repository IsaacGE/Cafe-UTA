//SignIn method request //
$('#btnSignIn').on('click', () => {
  var data = { emailOrId: $('#idOrEmail').val(), pass: $('#password').val() }
  RunAjaxRequest('post', 'auth/signin', '', '', data)
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
  RunAjaxRequest('post', 'auth/signup', '', '', data)
})
//--------//



$(document).ready(() => {
  $('.change-form-box').click(() => {
    $('input').val('')
    $('.valid-msg').remove()
  })

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


// VALIDATION SIGNIN FORM //
$('#password, #idOrEmail').on('change keyup paste', () => {
  $('.valid-msg').length ? disableEnableBtn('btnSignIn', true) : disableEnableBtn('btnSignIn', false)
  $('.valid-msg').remove()
  if ($('#idOrEmail').val().length < 6) {
    $(`<small class="valid-msg idOrEmail-msg">Ingresa al menos ${6 - $('#idOrEmail').val().length} caracteres</small>`).insertAfter($('#idOrEmail'));
    return;
  } else {
    $('.idOrEmail-msg').remove()
  }
  if ($('#password').val().length < 8) {
    $(`<small class="valid-msg password-msg">Ingresa al menos ${8 - $('#password').val().length} caracteres</small>`).insertAfter($('#password'));
    return;
  } else {
    $('.password-msg').remove();
  }
})


// VALIDATION SIGNUP FORM //
$('#newPassword, #name, #email, #matricula').on('change keyup paste', () => {
  $('.valid-msg').length ? disableEnableBtn('btnSignUp', true) : disableEnableBtn('btnSignUp', false)
  $('.valid-msg').remove()
  if ($('#name').val().length < 10) {
    $(`<small class="valid-msg name-msg">Ingresa al menos ${10 - $('#name').val().length} caracteres</small>`).insertAfter($('#name'));
    return;
  } else {
    $('.name-msg').remove()
  }
  if ($('#email').val().length < 6) {
    $(`<small class="valid-msg email-msg">Ingresa al menos ${6 - $('#email').val().length} caracteres</small>`).insertAfter($('#email'));
    return;
  } else if (!isValidEmail($('#email').val())) {
    $(`<small class="valid-msg email-msg">Ingresa un correo electrónico válido</small>`).insertAfter($('#email'));
    return;
  } else {
    $('.email-msg').remove()
  }
  if ($('#matricula').val().length < 6) {
    $(`<small class="valid-msg matricula-msg">Ingresa al menos ${6 - $('#matricula').val().length} caracteres</small>`).insertAfter($('#matricula'));
    return;
  } else {
    $('.matricula-msg').remove()
  }
  if ($('#newPassword').val().length < 8) {
    $(`<small class="valid-msg newPassword-msg">Ingresa al menos ${8 - $('#newPassword').val().length} caracteres, para una contrasña segura</small>`).insertAfter($('#newPassword'));
    return;
  } else {
    $('.newPassword-msg').remove();
  }
})