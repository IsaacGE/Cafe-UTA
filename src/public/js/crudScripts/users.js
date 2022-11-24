var userId;

$(document).ready(() => {
    // Show modal create new user //
    $('#btnAddNewUser').on('click', () => {
        crudAction = 'create'
        FillModalFormCrud('createUpdateUserForm', '<i class="bi bi-person-fill-add"></i>&nbsp;Agregar un nuevo usuario', '<i class="bi bi-plus-circle-fill"></i>&nbsp;Agregar')
    })

    // Show modal for update user information //
    $('table').on('click', '.btn-update-user', function () {
        crudAction = 'update'
        userId = $(this).attr('data-id-user')
        FillModalFormCrud('createUpdateUserForm', '<i class="bi bi-person-lines-fill"></i>&nbsp;Actualizar información de usuario', '<i class="bi bi-check-all"></i>&nbsp;Guardar', 'id', userId)
    })


    //Show modal confirmation for disable / enable //
    $('table').on('click', '.btn-status-user', function () {
        var userName = $(this).attr('data-name')
        var status = $(this).attr('data-status')
        userId = $(this).attr('data-id-user')
        SwalConfirmation(`El usuario ${userName} ${status == 'true' ? 'no podrá acceder' : 'podrá acceder nuevamente'} al sistema`, `¿${status == 'true' ? 'Desactivar' : 'Activar'} usuario?`, 'question', status == 'true' ? 'Desactivar' : 'Activar')
        $('.swal2-actions .swal2-confirm').on('click', () => {
            RunAjaxRequest('put', 'users/updateStatus', 'id', userId, { active: status == 'true' ? false : true })
        })
    })


    // Show modal confirmation for delete user //
    $('table').on('click', '.btn-delete-user', function () {
        var userName = $(this).attr('data-name')
        userId = $(this).attr('data-id-user')
        SwalConfirmation(`El usuario ${userName} será eliminado de forma permanente`, `¿Eliminar usuario?`, 'question', 'Eliminar')
        $('.swal2-actions .swal2-confirm').on('click', () => {
            RunAjaxRequest('delete', 'users/delete', 'id', userId)
        })
    })
})



// Create new Product method //
$('#btnActionModalLarge').on('click', () => {
    validateUserForm()
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
        RunAjaxRequest('post', 'users/create', '', '', data)
    } else if (crudAction == 'update') {
        RunAjaxRequest('put', 'users/update', 'id', userId, data)
    }
    disableEnableBtn('btnActionModalLarge', true)
})


function validateUserForm() {
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