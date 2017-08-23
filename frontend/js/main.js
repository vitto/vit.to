$(function () {
  var bLazy = new Blazy({
    selector: 'img'
  })

  var timeagoInstance = timeago(null, 'it')
  var nodes = document.querySelectorAll('.timeago')
  timeagoInstance.render(nodes, 'it')

  var $readingTime = $('.reading-time')
  if ($readingTime.length > 0) {
    var article = $('.markdown').text()
    if (article.length === 0) {
      $readingTime.closest('.article__info').remove()
    } else {
      var stats = readingTime(article)
      $readingTime.text(stats.text)
    }
  }

  var header = document.querySelector('.header-mobile')
  if (header !== null) {
    var headerHeadroom = new Headroom(header, {
      tolerance: {
        up: 10,
        down: 0
      }
    })
    headerHeadroom.init()
  }

  var footer = document.querySelector('.footer-mobile')
  if (footer !== null) {
    var footerHeadroom = new Headroom(footer, {
      classes: {
        unpinned: 'headroom--unpinned-bottom'
      },
      tolerance: {
        up: 10,
        down: 0
      }
    })
    footerHeadroom.init()
  }

  var $policyYear = $('#cookie-policy__year')
  if ($policyYear.length > 0) {
    var thisYear = new Date().getFullYear()
    if ($policyYear.text() !== thisYear.toString()) {
      $policyYear.text(thisYear)
    }
  }
})
