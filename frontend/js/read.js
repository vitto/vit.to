$(function () {
  return;
  if (typeof window.speechSynthesis === 'undefined') {
    $('.button--speech').addClass('button--disabled');
    return;
  }

  window.speechSynthesis.cancel()

  if ($('.markdown').length === 1) {
    var originalText = $('.button--speech .button__text').text()
    var pauseText = $('.button--speech').data('pause')
    var text = $('.markdown').text()
    var speech = new SpeechSynthesisUtterance(text)

    var  t;
    speech.onstart = function (event) {
      t = event.timeStamp;
    }

    speech.onend = function (event) {
      t = event.timeStamp-t;
      $('.button--speech').removeClass('button--is-reading')
      $('.button--speech').find('.button__text').text(originalText)
    }

    window.speechSynthesis.speak(speech)
    window.speechSynthesis.pause()

    $('.button--speech').on('click', function () {
      $(this).toggleClass('button--is-reading')

      if ($(this).hasClass('button--is-reading')) {
        $(this).find('.button__text').text(pauseText)
        window.speechSynthesis.resume()
      } else {
        $(this).find('.button__text').text(originalText)
        window.speechSynthesis.pause()
      }
    })
  }
})
