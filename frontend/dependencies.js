const path = require('path')
const __modules = path.join(__dirname, '/../node_modules')
const __js = path.join(__dirname, '/js')
const __sass = path.join(__dirname, '/sass/default')
const __vendors = path.join(__dirname, '/vendors')

module.exports = {
  css: {
    theme: [
      path.join(__sass, '/import.scss')
    ],
    vendor: [
      // path.join(__modules, '/material-design-icons/iconfont/material-icons.css'),
      path.join(__vendors, '/typeface-exo-2.css')
    ]
  },
  js: {
    app: [
      path.join(__js, '/glitch.js'),
      path.join(__js, '/textShuffle.js')
    ],
    vendor: [
      path.join(__modules, '/jquery/dist/jquery.slim.js'),
      path.join(__modules, '/three/build/three.js')
    ],
    provider: {
      THREE: 'three',
      jquery: 'jQuery'
    }
  }
}
