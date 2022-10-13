var showPass = true

$('#showHidePassword').on('click', () => {
    if (showPass) {
        $('#password').attr('type', 'text')
        showPass = false
        $('#iconPassword').attr('class', 'bi bi-eye-fill')
    } else {
        $('#password').attr('type', 'password')
        showPass = true
        $('#iconPassword').attr('class', 'bi bi-eye-slash-fill')
    }
})