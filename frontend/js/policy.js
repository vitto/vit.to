(function () {
  var policySaw = Cookies.get('policySaw') || false

  if (policySaw) {
    return
  }

  function setCookies () {
    if (!policySaw) {
      Cookies.set('policySaw', true)
      policySaw = true
    }
  }

  $('#policy-message').addClass('policy-container--visible')

  $('a').on('click', function () {
    setCookies()
  })

  window.document.addEventListener('scroll', function (event) {
    setCookies()
  }, false)
})()
