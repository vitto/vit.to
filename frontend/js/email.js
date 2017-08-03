$(function () {
  $('#budget').jRange({
    from: -2.0,
    to: 2.0,
    step: 0.5,
    scale: [-2.0, -1.0, 0.0, 1.0, 2.0],
    format: '%s',
    width: 300,
    showLabels: true,
    snap: true,
    onstatechange: function (value) {
      console.log(value)
    }
  })

  var perc = Math.round(100*400/650);
  var percLess = -(100 - perc) + '%';

  console.log(percLess);

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
