var localUri = `${window.location.origin}`
var crudAction;

function ShowLoaderSpinner() {
  $.blockUI({
    message: '<div id="loaderSpinner"><span class="loader"></span><h4 class="text-center" style="font-weight: 300; color: #fff;text-shadow: 0 1px 1px #00000013 inset, 0 0 8px #22222299;">Tus huevos se estan cocinando...</h4></div>'
  });
}
function HideLoaderSpinner() {
  $.unblockUI();
}

$('#btnCloseSession').on('click', () => {
  showCustomSmallAlert("Estas a punto de sair de la aplicación", "¿Cerrar sesión?", 'arrow-return-left', 'Permanecer', 'box-arrow-right', 'Salir')
})

//Server error alerts 
function showCustomSmallAlert(message, title, btnIconLeft, btnTextLeft, btnIconRight = '', btnTextRight = '') {
  $('#smallAlert .modal-title').html(title)
  $('#smallAlert .modal-body').html(`<small>${message}</small>`)
  if (btnIconRight != '') {
    $('#smallAlert .modal-footer').html(`<button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><i class="bi bi-${btnIconLeft}"></i>&nbsp;${btnTextLeft}</button><button type="button" id="smallAlertAction" class="btn btn-primary"><i class="bi bi-${btnIconRight}"></i>&nbsp;${btnTextRight}</button>`)
  } else {
    $('#smallAlert .modal-footer').html(`<button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><i class="bi bi-${btnIconLeft}"></i>&nbsp;${btnTextLeft}</button>`)
  }
  $('#smallAlert').modal('show')
}


//Add title and buttons to large alert
function addButtonsAndTitleToAlert(title, leftBtnContent, rigthBtnContent) {
  $('#largeModal .modal-title').html(title)
  $('#largeModal .modal-footer .btn-secondary').html(leftBtnContent)
  $('#largeModal .modal-footer .btn-primary').html(rigthBtnContent)
}

//SWAL FOR ALERTS
function showToastAlert(message, icon, reloadPage = false) {
  ShowLoaderSpinner()
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
  if (reloadPage) {
    setInterval(() => {
      window.location.reload()
    }, 1500);
  } else {
    HideLoaderSpinner()
  }
}


// Swal normal size //
function SwalConfirmation(message, title, icon, textConfirm) {
  Swal.fire({
    title: title,
    text: message,
    icon: icon,
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: textConfirm,
    cancelButtonText: 'Cancelar'
  })
}


// Function for disable buttons //
function disableEnableBtn(element, action) {
  $(`#${element}`).attr('disabled', action)
}

// Validate email //
function isValidEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}


//Show hide password in forms //
$('.show-hide-password').on('click', function () {
  var classParent = $(this).parent().attr('class').split(' ').at(-1)
  var currentAttr = $(`.${classParent} input`).attr('type')
  $(`.${classParent} input`).attr('type', currentAttr == 'password' ? 'text' : 'password')
  currentAttr == 'password' ? $(this).html('<i class="bi bi-eye-fill"></i>') : $(this).html('<i class="bi bi-eye-slash-fill"></i>')
})


$(document).ready(function () {
  $('.dataTable').DataTable({
    language: {
      "decimal": "",
      "emptyTable": "No hay información",
      "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
      "infoEmpty": "Mostrando 0 a 0 de 0 registros",
      "infoFiltered": "(Filtrado de _MAX_ total de registros)",
      "infoPostFix": "",
      "thousands": ",",
      "lengthMenu": "Mostrar _MENU_ registros",
      "loadingRecords": "Cargando...",
      "processing": "Procesando...",
      "search": "Buscar:",
      "zeroRecords": "Sin resultados encontrados",
      "paginate": {
        "first": "Primero",
        "last": "Último",
        "next": "Siguiente",
        "previous": "Anterior"
      }
    }
  });

  // Validate if imagees is loaded correct mode or replace //
  $('img').each(function () {
    $(this).on('error', () => {
      $(this).attr('src', 'assets/images/notFound.jpg')
    })
  });
});



// Fill modal form to create or update information //
function FillModalFormCrud(endpoint, modalTitle, buttonText, paramName = '', paramValue = '') {
  var queryParam = '';
  if (paramName.length > 0 && paramValue.length > 0) queryParam = `?${paramName}=${paramValue}`
  $.ajax({
    method: "get",
    url: `${localUri}/${endpoint}${queryParam}`,
  })
    .done(response => {
      $('#largeModal .modal-body').html(response)
      addButtonsAndTitleToAlert(modalTitle, '<i class="bi bi-x"></i>&nbsp;Cancelar', buttonText)
    })
    .fail(response => {
      if (response.status == 500) showCustomSmallAlert(response.responseJSON.msg, '<i class="bi bi-bug-fill"></i> Error en el servidor', 'arrow-counterclockwise', 'Cerrar')
      else showToastAlert(response.responseJSON.msg, 'error')
      $('#loaderSpinner').hide()
    })
}


$(document).ajaxStart(ShowLoaderSpinner()).ajaxStop(HideLoaderSpinner());



// Form validation with bootstrap  //
