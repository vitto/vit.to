const path = require('path')
const __modules = path.join(__dirname, '/../node_modules')
const __js = path.join(__dirname, '/js')
const __sass = path.join(__dirname, '/sass/default')

module.exports = {
  css: {
    theme: [
      path.join(__sass, '/import.scss')
    ],
    vendor: [
      path.join(__modules, '/animate.css/animate.css'),
      path.join(__modules, '/nouislider/distribute/nouislider.css'),
      path.join(__modules, '/material-design-icons/iconfont/material-icons.css')
    ]
  },
  js: {
    app: [
      path.join(__js, '/email-budget.js'),
      path.join(__js, '/email-message.js'),
      path.join(__js, '/main.js'),
      path.join(__js, '/read.js'),
      path.join(__js, '/policy.js')
    ],
    vendor: [
      path.join(__modules, '/jquery/dist/jquery.js'),
      path.join(__modules, '/blazy/blazy.js'),
      path.join(__modules, '/headroom.js/dist/headroom.js'),
      path.join(__modules, '/nouislider/distribute/nouislider.js'),
      path.join(__modules, '/js-cookie/src/js.cookie.js'),
      path.join(__modules, '/reading-time/lib/reading-time.js'),
      path.join(__modules, '/timeago.js/dist/timeago.js'),
      path.join(__modules, '/chart.js/dist/Chart.bundle.js'),
      path.join(__modules, '/zooming/build/zooming.js')
    ],
    provider: {
      $: 'jquery',
      Blazy: 'blazy',
      jQuery: 'jquery',
      Chart: 'chart.js',
      noUiSlider: 'nouislider',
      Cookies: 'js-cookie/src/js.cookie.js',
      timeago: 'timeago.js',
      readingTime: 'reading-time/lib/reading-time.js',
      Zooming: 'zooming'
    }
  }
}
