const fs = require('fs')
const collections = require('metalsmith-collections')
const markdown = require('metalsmith-markdown')
const metalsmith = require('metalsmith')
const permalinks = require('metalsmith-permalinks')
const robots = require('metalsmith-robots')
const sitemap = require('metalsmith-sitemap')
const twig = require('metalsmith-twig')
const yaml = require('js-yaml')
const faker = require('faker')
const marked = require('marked')
const moment = require('moment')

var renderer = new marked.Renderer()

renderer.image = function (href, title, text) {
  var titleAttr = ''
  var altAttr = ''

  if (typeof text !== 'undefined') {
    altAttr = ` alt="${text}"`
    titleAttr = ` title="${text}"`
  }

  return `<img data-src="${href}" data-action="zoom"${titleAttr}${altAttr}>`
}
// console.log(marked('![This is the cover](tires-with-dirty.jpg)', { renderer: renderer }));

var m = yaml.safeLoad(fs.readFileSync('metalsmith.yml', 'utf-8'))
var images = yaml.safeLoad(fs.readFileSync('fake-images.yml', 'utf-8'))

m.twig.global = {
  faker: faker,
  images: images
}
m.markdown.renderer = renderer
m.metadata.lastmod = moment().format()
m.metadata.last_edit_year = moment().format('YYYY')
m.sitemap.lastmod = moment().format('YYYY-MM-DD')

metalsmith(__dirname)
  .metadata(m.metadata)
  .source(m.source)
  .destination(m.destination)
  .clean(m.clean)
  .use(collections(m.collections))
  .use(markdown(m.markdown))
  .use(permalinks(m.permalinks))
  .use(twig(m.twig))
  .use(sitemap(m.sitemap))
  .use(robots(m.robots))
  .build(function (err) {
    if (err) throw err
    console.log('Metalsmith build done successfully.')
  })
