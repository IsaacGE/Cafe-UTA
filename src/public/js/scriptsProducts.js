$('#btnAddNewProduct').on('click', () => {
    $('#loaderSpinner').show()
    $.ajax({
        method: "get",
        url: `${localUri}/newProductForm`,
    })
        .done(response => {
            var title = '<i class="bi bi-plus-circle-fill"></i>&nbsp;Agregar un nuevo producto'
            addButtonsAndTitleToAlert(title, "x", 'Calcelar', 'plus-circle-fill', 'Guardar', 'btnSaveProduct')
            $('#largeModal .modal-body').html(response)
        })
        .fail(response => {
            console.log("ERROR",response)
        })
    $('#loaderSpinner').hide()
})

$(document).ready(() => {
    $('#tableProductsManage').DataTable()
})