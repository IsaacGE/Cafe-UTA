var productId;

$(document).ready(() => {
    // Show modal create new product //
    $('#btnAddNewProduct').on('click', () => {
        crudAction = 'create'
        FillModalFormCrud('createUpdateProductForm', '<i class="bi bi-plus-circle-fill"></i>&nbsp;Agregar un nuevo producto', '<i class="bi bi-plus-circle-fill"></i>&nbsp;Agregar')
    })

    // Show modal for update product information //
    $('table').on('click', '.btn-update-product', function () {
        crudAction = 'update'
        productId = $(this).attr('data-id-product')
        FillModalFormCrud('createUpdateProductForm', '<i class="bi bi-pencil-square"></i> Actualizar información de producto', '<i class="bi bi-check-all"></i>&nbsp;Guardar', 'id', productId)
    })


    //Show modal confirmation for disable / enable //
    $('table').on('click', '.btn-status-product', function () {
        var productName = $(this).attr('data-name')
        var status = $(this).attr('data-status')
        productId = $(this).attr('data-id-product')
        SwalConfirmation(`El producto ${productName} estará ${status == 'true' ? 'deshabilitado' : 'disponible nuevamente'} para los usuarios`, `¿${status == 'true' ? 'Desactivar' : 'Activar'} producto?`, 'question', status == 'true' ? 'Desactivar' : 'Activar')
        $('.swal2-actions .swal2-confirm').on('click', () => {
            RunAjaxRequest('put', 'products/updateStatus', 'id', productId, { active: status == 'true' ? false : true })
        })
    })


    // Show modal confirmation for delete product //
    $('table').on('click', '.btn-delete-product', function () {
        var productName = $(this).attr('data-name')
        productId = $(this).attr('data-id-product')
        SwalConfirmation(`El producto ${productName} será eliminado de forma permanente`, `¿Eliminar producto?`, 'question', 'Eliminar')
        $('.swal2-actions .swal2-confirm').on('click', () => {
            RunAjaxRequest('delete', 'products/delete', 'id', productId)
        })
    })

    // Redirect to products by category //
    $('.btn-related-products').on('click', function () {
        var idCategory = $(this).attr('data-idCategory')
        window.location.href = `${localUri}/productsByCategory?id=${idCategory}`
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
        RunAjaxRequest('post', 'products/create', '', '', data)
    } else if (crudAction == 'update') {
        RunAjaxRequest('put', 'products/update', 'id', productId, data)
    }
    disableEnableBtn('btnActionModalLarge', true)
})

/**
 * Agregando productos al carrito desde la pagina de productos
 * y la pagina de categorias de productos
 */
$(document).on('click', '.btn-add-to-cart', function () {
    var idProduct = $(this).attr('data-idProduct')
    var productPrice = $(this).attr('data-productPrice')
    RunAjaxRequest('post', 'sales/createOrUpdate', '', '', { productList: idProduct, totalSale: productPrice }, false)
})


/**
 * Metodo que valida laos campos del formulario de crear y actualizar informaciond de productos
 * Se hace la validacion de cada uno de los campos y se agrega un mensaje debajo 
 * del campo valdado si existe un error para indeicar al usuario lo que hace falta
 * @param {} 
 * @returns {}
 */
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
}