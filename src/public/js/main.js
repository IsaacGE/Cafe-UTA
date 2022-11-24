var localUri = `${window.location.origin}`
var crudAction;
var imageToUpload; //Varible de imagen para mandar a registrar (URL de imagen)

/**
 * Funcion para bloquear la interfaz del usuario 
 * mostrando un loader spinner con un mensaje por defecto 
 */
function ShowLoaderSpinner() {
  $.blockUI({
    message: '<div id="loaderSpinner"><span class="loader"></span><h4 class="text-center" style="font-weight: 300; color: #fff;text-shadow: 0 1px 1px #00000013 inset, 0 0 8px #22222299;">Tus huevos se estan cocinando...</h4></div>'
  });
}
/**
 * Funcion para detener el bloqueo de la interfaz de usuario y el loader spinner
 */
function HideLoaderSpinner() {
  $.unblockUI();
}

$('#btnCloseSession').on('click', () => {
  showCustomSmallAlert("Estas a punto de sair de la aplicación", "¿Cerrar sesión?", 'arrow-return-left', 'Permanecer', 'box-arrow-right', 'Salir')
})

/**
 * Funcion para mostrar una alerta personalizada (modal-sm bootstrap)
 * @param {text:String} message                     [Mensaje a mostrar en la alerta]
 * @param {text:String} title                       [Titulo de la alerta]
 * @param {icon(Bootstrap):String} btnIconLeft      [Nombre del icono de Bootstrap a mostrar en el boton izquierdo]
 * @param {text:String?} btnTextLeft                [Texto a mostrar en el boton izquierdo]
 * @param {icon(Bootstrap):String?} btnIconRight?   [Nombre del icono de Bootstrap a mostrar en el boton derecho (Puede ser null)]
 * @param {text:String?} btnTextRight?              [Texto a mostrar en el boton derecho (Puede ser null)]
 */
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


/**
 * Funcion para agregar botones y titulo de contexto al modal alert para formularios
 * @param {text:String} title             [Titulo que tendrá el modal alert del formulario o el uso que se requiera]
 * @param {text:String} leftBtnContent    [Contenido (texto) que mostrará el boton izquierdo del modal]
 * @param {text:String} rigthBtnContent   [Contenido (texto) que mostrará el boton derecho del modal]
 */
function addButtonsAndTitleToAlert(title, leftBtnContent, rigthBtnContent) {
  $('#largeModal .modal-title').html(title)
  $('#largeModal .modal-footer .btn-secondary').html(leftBtnContent)
  $('#largeModal .modal-footer .btn-primary').html(rigthBtnContent)
}

/**
 * Funcion para mostrar un toast alert de SweetAleert
 * @param {text:String} message           [Mensaje que mostrará el toast alert]
 * @param {icon(SweetAlert):String} icon  [Nombre del icono que se mostrará en el toast alert (success, error, warning, question, info)]
 * @param {:boolean} reloadPage            [Si se requiere recargar pagina despues de mostrar el toast alert]
 */
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


/**
 * Funcion para mostrar una alerta SweetAlert de confirmacion
 * @param {text:String} message           [Mensaje de la alerta]
 * @param {text:String} title             [Titulo que tendrá la alerta]
 * @param {icon(SweetAlert):String} icon  [Icono a mostrar en la alerta (success, error, warning, question, info)]
 * @param {text:String} textConfirm       [Texto que mostrará el boton de confirmacion]
 */
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


/**
 * Funcion para desactivar o activar un boton
 * @param {text:string} element   [ID del boton a alterar] 
 * @param {:Boolean} action       [Desactivar o activar boton (true | flase)]
 */
function disableEnableBtn(element, action) {
  $(`#${element}`).attr('disabled', action)
}

/**
 * Funcion para validar y verificar que se esta ingresando un correo electrónico
 * con un formato correcto
 * @param {text:String} email  [Coreo electrónico a validar formato]
 * @returns {:Boolean}         [Si el correo tiene formato correcto regresa 'true', si no, regresa 'false']
 */
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



/**
 * Funcion para consultar en el servidor (API) la vista solicitada y mostrarla 
 * en el modal (modal-lg Bootstrap) para los formularios
 * @param {text:String} endpoint        [Endpoint del metodo del controlador al cual se hace el request de tipo GET]
 * @param {text:String} modalTitle      [Titulo que se mostrará en el modal]
 * @param {text:String} buttonText      [Contenido que tendrá el boton que realizará la accion del formulario]
 * @param {text:String} paramName       [Clave del parametro al cual se hará el request (Solo si es necesario - no se requiere)]
 * @param {*:any} paramValue            [Valor del parametro al cual se hará el request (Solo si es necesario - no se requiere)]
 */
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


/**
 * Metodo para ejecutar peticiones de Ajax dinamicas (POST, GET, PUT, DELETE)
 * @param {text:String} methodReq   *Tipo de peticion HTTP que se estara ejecutando (POST, GET, PUT, DELETE) 
 * @param {text:String} endpoint    *Endpint al que se estara enviando el request
 * @param {text:String} paramKey    *Nombre de la variable que se estara enviando por parametro en la url (Solo si se requiere)
 * @param {text:String} paramValue  *Valor que se asigna a la variable que se envia por parametro en la url (Solo si se requiere)
 * @param {*:Any} data          *Datos que se envian por body en el request (solo si es necesario) 
 */
function RunAjaxRequest(methodReq, endpoint, paramKey = '', paramValue = '', data = {}) {
  if (endpoint.charAt(0) == '/') endpoint.slice(1)
  var completeEndpint = paramKey != '' || paramKey == null ? `${endpoint}?${paramKey}=${paramValue}` : endpoint
  $.ajax({
    method: methodReq,
    url: `${localUri}/${completeEndpint}`,
    data: data
})
    .done(response => {
        showToastAlert(response.msg, 'success', true)
    })
    .fail(response => {
        if (response.sFtatus == 500) showCustomSmallAlert(response.responseJSON.msg, '<i class="bi bi-bug-fill"></i> Error en el servidor', 'arrow-counterclockwise', 'Cerrar')
        else showToastAlert(response.responseJSON.msg, 'error')
    })
}

$(document).ajaxStart(ShowLoaderSpinner()).ajaxStop(HideLoaderSpinner());


// Form validation with bootstrap  //
