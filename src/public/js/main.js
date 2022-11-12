var localUri = `${window.location.origin}`

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

function addButtonsAndTitleToAlert(title, btnIconLeft, btnTextLeft, btnIconRight = '', btnTextRight = '', idAction) {
  var footer = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><i class="bi bi-${btnIconLeft}"></i>&nbsp;${btnTextLeft}</button>`
  footer += btnIconRight.length > 0 ? `<button type="button" id="${idAction}" class="btn btn-primary"><i class="bi bi-${btnIconRight}"></i>&nbsp;${btnTextRight}</button>` : ''
  $('#largeModal .modal-title').html(title)
  $('#largeModal .modal-footer').html(footer)
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


$(document).ready(function() {
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
});
