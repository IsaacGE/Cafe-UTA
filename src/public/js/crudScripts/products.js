var productId;

$(document).ready(() => {
    $('#tableProductsManage').DataTable()

    // Show modal create new product //
    $('#btnAddNewProduct').on('click', () => {
        crudAction = 'create'
        FillModalFormCrud('newProductForm', '<i class="bi bi-plus-circle-fill"></i>&nbsp;Agregar un nuevo producto', '<i class="bi bi-plus-circle-fill"></i>&nbsp;Agregar')
    })

    // Show modal for update product information //
    $('.btn-update-product').on('click', function () {
        crudAction = 'update'
        productId = $(this).attr('data-id-product')
        FillModalFormCrud('updateProductForm', '<i class="bi bi-pencil-square"></i> Actualizar información de producto', '<i class="bi bi-check-all"></i>&nbsp;Guardar', 'id', productId)
    })


    //Show modal confirmation for disable / enable //
    $('.btn-status-product').on('click', function () {
        var productName = $(this).attr('data-name')
        var status = $(this).attr('data-status')
        productId = $(this).attr('data-id-product')
        SwalConfirmation(`El producto ${productName} estará ${status == 'true' ? 'deshabilitado' : 'disponible nuevamente'} para los usuarios`, `¿${status == 'true' ? 'Desactivar' : 'Activar'} producto?`, 'question', status == 'true' ? 'Desactivar' : 'Activar')
        $('.swal2-actions .swal2-confirm').on('click', () => {
            $.ajax({
                method: "put",
                url: `${localUri}/products/updateStatus?id=${productId}`,
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


    // Show modal confirmation for delete product //
    $('.btn-delete-product').on('click', function () {
        var productName = $(this).attr('data-name')
        productId = $(this).attr('data-id-product')
        SwalConfirmation(`El producto ${productName} será eliminado de forma permanente`, `¿Eliminar producto?`, 'question', 'Eliminar')
        $('.swal2-actions .swal2-confirm').on('click', () => {
            $.ajax({
                method: "delete",
                url: `${localUri}/products/delete?id=${productId}`,
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
    validateProductForm()
    if ($('.valid-msg').length) return;
    var data = {
        name: $('#name').val(),
        price: $('#price').val(),
        stock: $('#stock').val(),
        imageUrl: $('#imageUrl').val(),
        description: $('#description').val(),
        idCategory: $('#category').val()
    }
    if (crudAction == 'create') {
        $.ajax({
            method: "post",
            url: `${localUri}/products/create`,
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
            url: `${localUri}/products/update?id=${productId}`,
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



function validateProductForm() {
    $('.valid-msg').remove()
    if ($('#name').val().length < 3) {
        $(`<small class="valid-msg name-msg">Debes ingresar un nombre para el producto</small>`).insertAfter($('#name'));
        return;
    } else {
        $('.name-msg').remove()
    }
    if ($('#price').val() == '' || $('#price').val() == 0) {
        $(`<small class="valid-msg price-msg">Ingresa un precio para el producto</small>`).insertAfter($('#price'));
        return;
    } else {
        $('.price-msg').remove()
    }
    if ($('#stock').val() == '') {
        $(`<small class="valid-msg stock-msg">Ingresa la cantidad de productos disponibles</small>`).insertAfter($('#stock'));
        return;
    } else {
        $('.stock-msg').remove()
    }
    if ($('#imageUrl').val().length < 8) {
        $(`<small class="valid-msg imageUrl-msg">Ingresa una ruta para la imagen del producto</small>`).insertAfter($('#imageUrl'));
        return;
    } else {
        $('.imageUrl-msg').remove();
    }
}