(function () {
  var bLazy = new Blazy({
    selector: 'img'
  })

  var timeagoInstance = timeago()
  var nodes = document.querySelectorAll('.timeago')
  timeagoInstance.render(nodes, 'it_IT')

  var header = document.querySelector('.header-mobile')
  if (header !== null) {
    var headerHeadroom = new Headroom(header)
    headerHeadroom.init()
  }

  var footer = document.querySelector('.footer-mobile')
  if (footer !== null) {
    var footerHeadroom = new Headroom(footer, {
      classes: {
        unpinned: 'headroom--unpinned-bottom'
      }
    })
    footerHeadroom.init()
  }
})()
