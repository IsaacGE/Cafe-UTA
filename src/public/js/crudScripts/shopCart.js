$('.btn-delete-product').on('click', function () {
  var productsLength = $(this).attr('data-productsLength')
  var totalNewSale = $(this).attr('data-totalNewSale')
  if (productsLength == 1) SwalConfirmation(`Solo hay un producto en el carrito. El carrito se eliminará de los registros`, '¿Eliminar carrito?', 'warning', 'Eliminar')
  else SwalConfirmation(`El producto ${$(this).attr('data-productName')} se eliminará del carrito de compras`, '¿Eliminar producto del carrito?', 'question', 'Eliminar')
  $('.swal2-actions .swal2-confirm').on('click', () => {
    RunAjaxRequest('put', 'sales/deleteProduct', 'id', $(this).attr('data-productId'), { totalNewSale }, true)
  })
})


/** MEtodo para realizar la compra o cancelar la compra del carrito */
$('.btn-set-new-status').on('click', function () {
  var action = $(this).attr('data-newStatus')
  var idCart = $(this).attr('data-cartId')
  var totalSale = $(this).attr('data-totalSale')
  var msgToShow = action == 'buy' ? 'realizado la compra' : 'cancelado tu compra'
  var msgAlert = action == 'buy' ? `Se hará el cargo de $${totalSale} pesos a tu cuenta de esta compra.` : 'Tu carrito quedará cancelado.'
  var titleAlert = action == 'buy' ? '¿Realizar compra del carrito?' : '¿Cancelar carrito?'
  SwalConfirmation(msgAlert, titleAlert, 'question', action == 'buy' ? 'Comprar' : 'Ok')
  $('.swal2-actions .swal2-confirm').on('click', () => {
    RunAjaxRequest('put', 'sales/updateStatus', 'id', idCart, { newOrderMsg: msgToShow, newStatus: action == 'buy' ? 'PE' : 'C' }, true)
  })
})


$('#tableShopHistory tbody').on('click', '.btn-order-details', function () {
  const orderId = $(this).attr('data-orderId')
  FillModalFormCrud('getOrderDetails', `<i class="bi bi-basket-fill"></i></i>&nbsp;Detalle de pedido: ${orderId}`, '', 'id', orderId)

})