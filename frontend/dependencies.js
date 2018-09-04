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
      path.join(__modules, '/material-design-icons/iconfont/material-icons.css')
    ]
  },
  js: {
    app: [
      path.join(__js, '/glitch.js')
    ],
    vendor: [
      path.join(__modules, '/three/build/three.js')
    ],
    provider: {
      THREE: 'three'
    }
  }
}
