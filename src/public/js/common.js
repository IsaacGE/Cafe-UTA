// SHOW PREVIEW IMAGE BEFORE UPLOAD //
$('#imageUrl').on('change paste', function () {
  imageToUpload = $(this).val()
  $('.image-preview').attr('src', imageToUpload)
  $('.image-preview').on('error', () => {
    $('.image-preview').attr('src', 'assets/images/notFound.jpg')
    imageToUpload = ''
  })
  $('.image-preview').on('load', () => {
    $('.image-preview').attr('src', imageToUpload)
  })
})