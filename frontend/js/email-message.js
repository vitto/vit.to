$(function () {
  if ($('#message').length === 0) {
    return
  }

  var $form = $('#message')
  var $inputEmail = $('#input-email')
  var $inputName = $('#input-name')
  var $inputNotes = $('#input-notes')
  var $statusError = $('.modal__body:nth-child(2)')
  var $statusSent = $('.modal__body:nth-child(1)')
  var emailIsValid = false
  var formIsPristine = true
  var nameIsValid = false

  function checkValidName (value) {
    var expression = /^[a-zA-Z]([-']?[a-zA-Z]+)*( [a-zA-Z]([-']?[a-zA-Z]+)*)+$/
    nameIsValid = expression.test(value)
    return nameIsValid
  }

  function checkValidEmail (value) {
    var expression = /\b[a-zA-Z0-9\u00C0-\u017F._%+-]+@[a-zA-Z0-9\u00C0-\u017F.-]+\.[a-zA-Z]{2,}\b/
    emailIsValid = expression.test(value)
    return emailIsValid
  }

  $('#send-message').on('click', function (e) {
    e.preventDefault()
    formIsPristine = false

    if (!checkValidName($inputName.val())) {
      $inputName.addClass('input__element--error')
      $inputName.removeClass('input__element--valid')
    } else {
      $inputName.removeClass('input__element--error')
      $inputName.addClass('input__element--valid')
    }

    if (!checkValidEmail($inputEmail.val())) {
      $inputEmail.addClass('input__element--error')
      $inputEmail.removeClass('input__element--valid')
    } else {
      $inputEmail.removeClass('input__element--error')
      $inputEmail.addClass('input__element--valid')
    }

    if (checkValidName($inputName.val()) && checkValidEmail($inputEmail.val())) {
      send()
    }
    return false
  })

  $inputName.on('keydown', function () {
    var $this = $(this)
    setTimeout(function () {
      if (checkValidName($this.val())) {
        $this.removeClass('input__element--error')
        $this.addClass('input__element--valid')
      }
    }, 0)
  })

  $inputEmail.on('keydown', function () {
    var $this = $(this)
    setTimeout(function () {
      if (checkValidEmail($this.val())) {
        $this.removeClass('input__element--error')
        $this.addClass('input__element--valid')
      }
    }, 0)
  })

  $inputName.on('blur', function () {
    if (!formIsPristine) {
      if (!checkValidName($(this).val())) {
        $(this).addClass('input__element--error')
        $(this).removeClass('input__element--valid')
      } else {
        $(this).removeClass('input__element--error')
        $(this).addClass('input__element--valid')
      }
    }
  })

  $inputEmail.on('blur', function () {
    if (!formIsPristine) {
      if (!checkValidEmail($(this).val())) {
        $(this).addClass('input__element--error')
        $(this).removeClass('input__element--valid')
      } else {
        $(this).removeClass('input__element--error')
        $(this).addClass('input__element--valid')
      }
    }
  })

  function resetComposeEmail () {
    $statusSent.addClass('modal__body--hidden').removeClass('fadeInLeft animated')
    $statusError.addClass('modal__body--hidden').removeClass('wobble animated')
  }

  function sendError () {
    $('.modal').addClass('modal--active')
    $statusSent.addClass('modal__body--hidden').removeClass('fadeInLeft animated')
    $statusError.removeClass('modal__body--hidden').addClass('wobble animated')
  }

  function send () {
    var messageDuration = 5000
    var serviceId = $form.data('emailjs-service-id')
    var templateId = $form.data('emailjs-template-id')

    emailjs.init($form.data('emailjs-user-id'))

    resetComposeEmail()
    $('.modal').addClass('modal--active')
    $statusSent.removeClass('modal__body--hidden').addClass('fadeInLeft animated')

    var params = {
      base_item_name: $form.data('item-title'),
      base_item_price: $form.data('item-price') + '€',
      base_item_url: $form.data('item-url'),
      user_email: $.trim($inputEmail.val()),
      user_full_name: $.trim($inputName.val()),
      user_name: $.trim($inputName.val()).split(' ')[0],
      user_notes: $.trim($inputNotes.val())
    }

    setTimeout(function () {
      $('.modal').removeClass('modal--active')
    }, messageDuration)

    emailjs.send(serviceId, templateId, params).then(
      function (response) {
        $inputEmail.val('')
        $inputName.val('')
        $inputNotes.val('')
      },
      function (error) {
        sendError()
        console.log('FAILED', error)
      }
    )
  }
})
