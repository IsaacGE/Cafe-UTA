var productId;

$(document).ready(() => {
    

    //Show modal confirmation for disable / enable //
    $('.addSaleProduct').on('click', function () {
        productId = $(this).attr('data-idProduct')
        var afterPrice = $(this).attr('data-price');
        var total = $(this).attr('data-total');
       
        var totalNew = parseInt(total) + parseInt(afterPrice)
        
        var data = {
            productsList:productId,
            totalSale:totalNew,
            buyerUser: '63644b9405958ad23f384668'
        }
        console.log(productId);

        $.ajax({
            method: "post",
            url: `${localUri}/sales/addSale`,
            data
            
        })
            .done(response => {
                showToastAlert(response.msg, 'success',true)
            })
            .fail(response => {
                if (response.status == 500) showCustomSmallAlert(response.responseJSON.msg, '<i class="bi bi-bug-fill"></i> Error en el servidor', 'arrow-counterclockwise', 'Cerrar')
                else showToastAlert(response.responseJSON.msg, 'error')
            })
    })


    $('.deleteProduct').on('click', function () {

        var idProduct = $(this).attr('data-idProduct');
        var resTotal = $(this).attr('data-resTotal');
        var precio = $(this).attr('data-price');
        var newTotal = parseInt(resTotal) - parseInt(precio);

        var data = {
            idProduct,
            totalSale:newTotal
        }
        $.ajax({
            method: "put",
            url: `${localUri}/sales/deleteProducto?buyerUser=63644b9405958ad23f384668`,  
            data          
        })
            .done(response => {
                showToastAlert(response.msg, 'success', true)
            })
            .fail(response => {
                if (response.status == 500) showCustomSmallAlert(response.responseJSON.msg, '<i class="bi bi-bug-fill"></i> Error en el servidor', 'arrow-counterclockwise', 'Cerrar')
                else showToastAlert(response.responseJSON.msg, 'error')
            })
    })

    
    $('.saleCheck').on('click', function () {
        
        var totalSale = $(this).attr('data-precioT');
        var productsList = $(this).attr('data-products')

        var newProductList = productsList.split(',')

        
        var data = {
            productsList:newProductList,
            totalSale,
            buyerUser: '63644b9405958ad23f384668'
        }
        $.ajax({
            method: "post",
            url: `${localUri}/historySale/addHistorySale`,
            data 
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

