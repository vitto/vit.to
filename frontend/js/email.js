$(function () {
  var $form = $('.modal__body:nth-child(1)')
  var $statusSent = $('.modal__body:nth-child(2)')
  var $statusError = $('.modal__body:nth-child(3)')
  var $sendBudget = $('#send-budget-request')

  $sendBudget.addClass('button--disabled')

  $('.button--try-budget, .button--try-budget-available').on('click', function (e) {
    e.preventDefault()
    $('.modal').addClass('modal--active')
    $('.body').addClass('body--no-scroll')
    $('input[name="from"]').focus()
    $('.header-mobile.headroom--pinned').removeClass('headroom--pinned').addClass('headroom--unpinned')
    $('.footer-mobile.headroom--pinned').removeClass('headroom--pinned').addClass('headroom--unpinned-bottom')
  })

  $('.modal__button--close, .modal-footer__link').on('click', function (e) {
    e.preventDefault()
    $('.modal').removeClass('modal--active')
    $('.body').removeClass('body--no-scroll')
    $('.header-mobile.headroom--unpinned').removeClass('headroom--unpinned').addClass('headroom--pinned')
    $('.footer-mobile.headroom--unpinned-bottom').removeClass('headroom--unpinned-bottom').addClass('headroom--pinned')
  })

  $('#send-budget-request').on('click', function (e) {
    e.preventDefault()
    $form.addClass('modal__body--hidden')
    $statusSent.removeClass('modal__body--hidden').addClass('fadeInLeft animated')
    setTimeout(function () {
      sendError()
    }, 3000)
    return false
  })

  function sendError () {
    $statusSent.addClass('modal__body--hidden').removeClass('fadeInLeft animated')
    $statusError.removeClass('modal__body--hidden').addClass('wobble animated')
  }

  var basePrice = $('#budget-range').data('price')

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
    var percChange = Math.round(value - 100)

    if (percChange > 0) {
      percChange = '+' + percChange + '%'
    } else {
      percChange = percChange + '%'
    }

    $('.noUi-handle').text(percChange)
    $('#custom-budget').text(Math.round(basePrice * value / 100) + '€')

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

  var formIsValid = false
  var nameIsValid = false
  var emailIsValid = false

  function checkFormValidity () {
    formIsValid = nameIsValid
    if (formIsValid) {
      formIsValid = emailIsValid
    }

    if (formIsValid) {
      $('#send-budget-request').removeClass('button--disabled')
    } else {
      $('#send-budget-request').addClass('button--disabled')
    }
  }

  function checkValidName (value) {
    var expression = /^[a-zA-Z]([-']?[a-zA-Z]+)*( [a-zA-Z]([-']?[a-zA-Z]+)*)+$/
    nameIsValid = expression.test(value)
    checkFormValidity()
    return nameIsValid
  }

  function checkValidEmail (value) {
    var expression = /\b[a-zA-Z0-9\u00C0-\u017F._%+-]+@[a-zA-Z0-9\u00C0-\u017F.-]+\.[a-zA-Z]{2,}\b/
    emailIsValid = expression.test(value)
    checkFormValidity()
    return emailIsValid
  }

  $('#input-name').on('keydown', function () {
    var $this = $(this)
    setTimeout(function () {
      if (checkValidName($this.val())) {
        $this.removeClass('input__element--error')
      }
    }, 0)
  })

  $('#input-email').on('keydown', function () {
    var $this = $(this)
    setTimeout(function () {
      if (checkValidEmail($this.val())) {
        $this.removeClass('input__element--error')
      }
    }, 0)
  })

  $('#input-name').on('blur', function () {
    if (!checkValidName($(this).val())) {
      $(this).addClass('input__element--error')
    } else {
      $(this).removeClass('input__element--error')
    }
  })

  $('#input-email').on('blur', function () {
    if (!checkValidEmail($(this).val())) {
      $(this).addClass('input__element--error')
    } else {
      $(this).removeClass('input__element--error')
    }
  })

  var params = {
    reply_to: 'pizza@pizza.com',
    to_name: 'James',
    base_item_price: '650',
    budget: '400',
    message: 'This is awesome!',
    base_item_name: '{{ title }}',
    base_item_url: '{{home}}/{{ path }}'
  }

  function send (serviceId, templateId, params) {
    emailjs.send(serviceId, templateId, params).then(
      function (response) {
        console.log('SUCCESS', response)
      },
      function (error) {
        console.log('FAILED', error)
      }
    )
  }

  // send('{{ metadata.service.email_js.service_id }}', 'budget', params);
})
