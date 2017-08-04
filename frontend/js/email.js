$(function () {

  var basePrice = $('#budget-range').data('price')

  noUiSlider.create(document.getElementById('budget'), {
    start: [ 100 ],
    connect: true,
    range: {
      'min': 0,
      'max': 200
    }
  }).on('update', function (values, handle) {
    var value = values[handle]
    var percChange = Math.round(value - 100)
    console.log(Math.round(basePrice * value / 100), percChange + '%')
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
