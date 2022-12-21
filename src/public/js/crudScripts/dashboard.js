var fromDate = ''
var toDate = ''

$('#dateRange').on('change', () => {
  if (dateRangeValue.length > 5) {
    fromDate = dateRangeValue.split('$')[0]
    toDate = dateRangeValue.split('$')[1]
  }
})