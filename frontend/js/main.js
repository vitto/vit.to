(function () {
  var bLazy = new Blazy({
    selector: 'img'
  })

  var timeagoInstance = timeago()
  var nodes = document.querySelectorAll('.timeago')
  timeagoInstance.render(nodes, 'it_IT')

  var myElement = document.querySelector('header')
  var headroom  = new Headroom(myElement);
  headroom.init();

})()
