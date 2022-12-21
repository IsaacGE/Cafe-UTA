$('#btnSearch').on('click', () => {
  var month = $('#month').val()
  var year = $('year').val()
  RunAjaxGetRequest('sales/getHistorical', [{ month }, { year }])
})