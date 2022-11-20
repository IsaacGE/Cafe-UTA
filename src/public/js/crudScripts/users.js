var userId;

$(document).ready(() => {
    // Show modal create new user //
    $('#btnAddNewUser').on('click', () => {
        crudAction = 'create'
        FillModalFormCrud('createUpdateUserForm', '<i class="bi bi-person-fill-add"></i>&nbsp;Agregar un nuevo usuario', '<i class="bi bi-plus-circle-fill"></i>&nbsp;Agregar')
    })

    // Show modal for update user information //
    $('.btn-update-user').on('click', function () {
        crudAction = 'update'
        userId = $(this).attr('data-id-user')
        FillModalFormCrud('createUpdateUserForm', '<i class="bi bi-person-lines-fill"></i>&nbsp;Actualizar información de usuario', '<i class="bi bi-check-all"></i>&nbsp;Guardar', 'id', userId)
    })


    //Show modal confirmation for disable / enable //
    $('.btn-status-user').on('click', function () {
        var userName = $(this).attr('data-name')
        var status = $(this).attr('data-status')
        userId = $(this).attr('data-id-user')
        SwalConfirmation(`El usuario ${userName} ${status == 'true' ? 'no podrá acceder' : 'podrá acceder nuevamente'} al sistema`, `¿${status == 'true' ? 'Desactivar' : 'Activar'} usuario?`, 'question', status == 'true' ? 'Desactivar' : 'Activar')
        $('.swal2-actions .swal2-confirm').on('click', () => {
            $.ajax({
                method: "put",
                url: `${localUri}/users/updateStatus?id=${userId}`,
                data: { active: status == 'true' ? false : true }
            })
                .done(response => {
                    showToastAlert(response.msg, 'success', true)
                })
                .fail(response => {
                    if (response.status == 500) showCustomSmallAlert(response.responseJSON.msg, '<i class="bi bi-bug-fill"></i> Error en el servidor', 'arrow-counterclockwise', 'Cerrar')
                    else showToastAlert(response.responseJSON.msg, 'error')
                })
        })
    })


    // Show modal confirmation for delete user //
    $('.btn-delete-user').on('click', function () {
        var userName = $(this).attr('data-name')
        userId = $(this).attr('data-id-user')
        SwalConfirmation(`El usuario ${userName} será eliminado de forma permanente`, `¿Eliminar usuario?`, 'question', 'Eliminar')
        $('.swal2-actions .swal2-confirm').on('click', () => {
            $.ajax({
                method: "delete",
                url: `${localUri}/users/delete?id=${userId}`,
                data: null
            })
                .done(response => {
                    showToastAlert(response.msg, 'success', true)
                })
                .fail(response => {
                    if (response.status == 500) showCustomSmallAlert(response.responseJSON.msg, '<i class="bi bi-bug-fill"></i> Error en el servidor', 'arrow-counterclockwise', 'Cerrar')
                    else showToastAlert(response.responseJSON.msg, 'error')
                })
        })
    })
})



// Create new Product method //
$('#btnActionModalLarge').on('click', () => {
    FormValidation()
    return
    if ($('.valid-msg').length) return;
    var data = {
        name: $('#name').val(),
        email: $('#email').val(),
        matricula: $('#matricula').val(),
        imageUrl: $('#imageUrl').val(),
        role: $('#role').val(),
        pass: $('#password').val()
    }
    if (crudAction == 'create') {
        $.ajax({
            method: "post",
            url: `${localUri}/users/create`,
            data: data
        })
            .done(response => {
                showToastAlert(response.msg, 'success', true)
            })
            .fail(response => {
                if (response.status == 500) showCustomSmallAlert(response.responseJSON.msg, '<i class="bi bi-bug-fill"></i> Error en el servidor', 'arrow-counterclockwise', 'Cerrar')
                else showToastAlert(response.responseJSON.msg, 'error')
            })
    } else if (crudAction == 'update') {
        $.ajax({
            method: "put",
            url: `${localUri}/users/update?id=${productId}`,
            data: data
        })
            .done(response => {
                showToastAlert(response.msg, 'success', true)
            })
            .fail(response => {
                if (response.status == 500) showCustomSmallAlert(response.responseJSON.msg, '<i class="bi bi-bug-fill"></i> Error en el servidor', 'arrow-counterclockwise', 'Cerrar')
                else showToastAlert(response.responseJSON.msg, 'error')
            })
    }
    disableEnableBtn('btnActionModalLarge', true)
})

function FormValidation() {
    $('form').validate({
        rules: {
            name: {
              required: true,
              minlength: 3  
            },
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 8
            },
            matricula: {
                required: true,
                minlength: 6
            }
        },
        messages: {
            name: 'Ingresa el nombre del usuario',
            email: 'Ingresa el correo del usuario',
            password: {
                required: 'Ingresa una contraseña para el usuario',
                minlength: 'Ingresa al menos 8 caracteres para la contraseña segura'
            },
            matricula: {
                required: 'Ingresa la matricula del usuario',
                minlength: 'Ingresa al menos 6 caracteres'
            }

        }
    })
}


function validateProductForm() {
    $('.valid-msg').remove()
    if ($('#name').val().length < 3) {
        $(`<small class="valid-msg name-msg">Debes ingresar un nombre para el usuario</small>`).insertAfter($('#name'));
    } else {
        $('.name-msg').remove()
    }
    if ($('#email').val() == '' || $('#email').val().length < 4) {
        $(`<small class="valid-msg email-msg">Ingresa el correo electrónico del usuario</small>`).insertAfter($('#email'));
    } else if (!isValidEmail($('#email').val())) {
        $(`<small class="valid-msg email-msg">Ingresa un correo electrónico válido</small>`).insertAfter($('#email'));
    } else {
        $('.email-msg').remove()
    }
    if ($('#matricula').val() == '') {
        $(`<small class="valid-msg matricula-msg">Ingresa la matricula del usuario</small>`).insertAfter($('#matricula'));
    } else if ($('#matricula').val().length < 6) {
        $(`<small class="valid-msg matricula-msg">Ingresa una matrícula válida</small>`).insertAfter($('#matricula'));
    } else {
        $('.matricula-msg').remove()
    }
    if ($('#password').val().length < 2) {
        $(`<small class="valid-msg password-msg">Ingresa la contraseña para el usuario</small>`).insertAfter($('#password'));
    } else if ($('#password').val().length < 8) {
        $(`<small class="valid-msg password-msg">Ingresa ${8 - $('#password').val().length} catacteres para una contraseña más segura</small>`).insertAfter($('#password'));
    } else {
        $('.password-msg').remove();
    }
}