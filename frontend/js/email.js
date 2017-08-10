$(function () {
  if ($('#budget').length === 0) {
    return
  }

  var $form = $('.modal__body:nth-child(1)')
  var $inputEmail = $('#input-email')
  var $inputName = $('#input-name')
  var $inputNotes = $('#input-notes')
  var $statusError = $('.modal__body:nth-child(3)')
  var $statusSent = $('.modal__body:nth-child(2)')
  var itemPrice = $form.data('item-price')
  var emailIsValid = false
  var formIsPristine = true
  var nameIsValid = false
  var percChange = 0
  var userBudget = $form.data('item-price')
  var thrownError = false

  function resetComposeEmail () {
    $form.removeClass('modal__body--hidden')
    $statusSent.addClass('modal__body--hidden').removeClass('fadeInLeft animated')
    $statusError.addClass('modal__body--hidden').removeClass('wobble animated')
  }

  $('.button--try-budget, .button--try-budget-available').on('click', function (e) {
    e.preventDefault()
    if (!thrownError) {
      resetComposeEmail()
    }
    $('.modal').addClass('modal--active')
    $('.body').addClass('body--no-scroll')
    $('input[name="from"]').focus()
  })

  $('.modal__button--close, .modal-footer__link').on('click', function (e) {
    e.preventDefault()
    $('.modal').removeClass('modal--active')
    $('.body').removeClass('body--no-scroll')
  })

  noUiSlider.create(document.getElementById('budget'), {
    start: [ 100 ],
    connect: true,
    padding: 20,
    range: {
      'min': -10,
      'max': 220
    }
  }).on('update', function (values, handle) {
    var value = values[handle]
    percChange = Math.round(value - 100)

    if (percChange > 0) {
      percChange = '+' + percChange + '%'
    } else {
      percChange = percChange + '%'
    }

    userBudget = Math.round(itemPrice * value / 100)

    $('.noUi-handle').text(percChange)
    $('#custom-budget').text(userBudget + '€')

    var child = 2
    if (value <= 80) {
      child = 1
    } else if (value >= 140) {
      child = 3
    }

    var $image = $('.budget__column:nth-child(' + child + ')')

    if (!$image.hasClass('budget__column--active')) {
      $('.budget__column').removeClass('budget__column--active')
      $image.addClass('budget__column--active')
    }
  })

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

  $('#send-budget-request').on('click', function (e) {
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

  function sendError () {
    thrownError = true
    $('.modal').addClass('modal--active')
    $('.body').addClass('body--no-scroll')
    $statusSent.addClass('modal__body--hidden').removeClass('fadeInLeft animated')
    $statusError.removeClass('modal__body--hidden').addClass('wobble animated')
  }

  function send () {
    var messageDuration = 5000
    var serviceId = $form.data('emailjs-service-id')
    var templateId = $form.data('emailjs-template-id')

    emailjs.init($form.data('emailjs-user-id'))

    var params = {
      base_item_name: $form.data('item-title'),
      base_item_price: $form.data('item-price') + '€',
      base_item_url: $form.data('item-url'),
      user_budget: userBudget + '€',
      user_email: $.trim($inputEmail.val()),
      user_full_name: $.trim($inputName.val()),
      user_name: $.trim($inputName.val()).split(' ')[0],
      user_notes: $.trim($inputNotes.val()),
      user_percent: percChange
    }

    if (percChange === '0%') {
      params.user_percent = 'invariato'
    }

    $form.addClass('modal__body--hidden')
    $statusSent.removeClass('modal__body--hidden').addClass('fadeInLeft animated')

    setTimeout(function () {
      $('.modal').removeClass('modal--active')
      $('.body').removeClass('body--no-scroll')
    }, messageDuration)

    emailjs.send(serviceId, templateId, params).then(
      function (response) { },
      function (error) {
        sendError()
        console.log('FAILED', error)
      }
    )
  }
})
