var showPass = true
var localUri = `${window.location.origin}`

$('#showHidePassword').on('click', () => {
  if (showPass) {
    $('#password').attr('type', 'text')
    showPass = false
    $('#iconPassword').attr('class', 'bi bi-eye-fill')
  } else {
    $('#password').attr('type', 'password')
    showPass = true
    $('#iconPassword').attr('class', 'bi bi-eye-slash-fill')
  }
})


//Server error alerts 
function showCustomSmallAlert(message, title, btnIconLeft, btnTextLeft, btnIconRight = '', btnTextRight = '') {
  $('#smallAlert .modal-title').html(title)
  $('#smallAlert .modal-body').html(`<small>${message}</small>`)
  if (btnIconRight != '') {
    $('#smallAlert .modal-footer').html(`<button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><i class="bi bi-${btnIconLeft}"></i>&nbsp;${btnTextLeft}</button><button type="button" id="smallAlertAction" class="btn btn-primary"><i class="bi bi-${btnIconRight}"></i>${btnTextRight}</button>`)
  } else {
    $('#smallAlert .modal-footer').html(`<button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><i class="bi bi-${btnIconLeft}"></i>&nbsp;${btnTextLeft}</button>`)
  }
  $('#smallAlert').modal('show')
}

//SWAL FOR ALERTS
function showToastAlert(message, icon) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  Toast.fire({
    icon: icon,
    title: message
  })
}


// Validate email //
function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}