import RandomText from '@gen/random-text'
import { TweenMax, Power2, TimelineLite } from 'gsap/TweenMax'
import $ from 'jquery'
import Handlebars from 'handlebars'

let config = {
  placeholderChar: '-',
  frameOffset: 10,
  charStep: 15,
  speed: 2,
}

let $phrases = $('.phrases');
let totalDelay = 0;

function merge (object) {
  return Object.assign({}, config, object);
}

function animateText (texts, delays, currentIndex, $textContent, firstRun) {
  firstRun = firstRun ? firstRun : false
  TweenMax.delayedCall(firstRun ? 0 : delays[currentIndex], () => {
    new RandomText(merge({
      str: texts[currentIndex],
      onProgress: str => { $textContent.text(str) },
      onComplete: str => {
        if (texts.length > 1) {
          currentIndex = currentIndex += 1
          currentIndex = currentIndex >= texts.length ? 0 : currentIndex
          animateText(texts, delays, currentIndex, $textContent)
        }
      },
    })).start();
  })
}

function textEffect (texts, $element, delays) {
  $element.addClass('text-item--visible')
  let $textContent = $($element.find('.text-item__content')[0])
  let currentIndex = 0
  animateText(texts, delays, currentIndex, $textContent, true)
}

function add (delay, texts, delays, clear) {

  texts = Array.isArray(texts) ? texts : [texts]
  delays = Array.isArray(delays) ? (delays ? delays : 0) : [delays]
  clear = clear ? true : false
  totalDelay += delay

  TweenMax.delayedCall(totalDelay, () => {
    let template = ''
    clear
    ?
      template = Handlebars.compile('<div class="text-item text-item--clear"><div class="text-item__content"></div></div>')
    :
      template = Handlebars.compile('<div class="text-item"><div class="text-item__content"></div></div>')

    $phrases.append(template())
    textEffect(texts, $($('.text-item')[$('.text-item').length - 1]), delays)
  })
}

$(function () {
  $phrases.empty()
  add(1, 'hello')
  add(2, 'i\'m', 0, true)
  add(0.5, ['vittorio vittori', 'glad to see you here'], [3, 1])
  add(2, ['i live in', 'i work in'], [1.3, 2.2], true)
  add(0, ['forlì', 'santarcangelo di romagna'], [1.3, 2.2])
  add(2, '_', 0, true)
  add(0.25, 'i work as', 0, true)
  add(0.125, ['ux designer', 'ui designer', 'front-end developer'], [1.5, 1.5, 1])
  add(2, 'design', 0, true)
  add(0.5, ['design systems', 'mobile ui', 'desktop ui', 'prototypes'], [1.75, 1.2, 1.1, 1, 1.2])
  add(2, 'coding', 0, true)
  add(0.5, ['css', 'markup', 'web components', 'some javascript', 'pattern libraries'], [0.75, 0.875, 1.1, 1, 1.2])
  add(2, 'i use', 0, true)
  add(0.5, ['agile method', 'bem', 'user stories'], [1, 0.875, 0.75])
  add(2, 'currently @', 0, true)
  add(0.5, ['gruppo maggioli', 'r&d department'], [1.2, 1.7])
  add(2, '_', 0, true)
  add(0.5, 'this is', 0, true)
  add(0.125, ['my homepage', 'my visual style', 'cyberpunk'], [0.75, 1, 0.6])
  add(2, 'i love', 0, true)
  add(0.5, ['my baby', 'my love', 'my dogs', 'video-games', 'experimenting with code', 'visual design', 'tdr'], [1.2, 1.1, 1, 0.85, 1.25, 1, 1.12])
  add(0.5, ['work', 'buy', 'consume', 'die'], [0.5, 0.5, 0.5, 0.5], true)
  add(1, '_', 0, true)
  add(0.5, 'need help?', 0, true)
  add(1, ['+39 320 1852742', 'vittorio.vittorio@maggioli.it'], [10, 10], true)
})
