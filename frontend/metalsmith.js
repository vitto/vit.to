const fs = require('fs')
const collections = require('metalsmith-collections')
const markdown = require('metalsmith-markdown')
const metalsmith = require('metalsmith')
const permalinks = require('metalsmith-permalinks')
const twig = require('metalsmith-twig')
const yaml = require('js-yaml')

const m = yaml.safeLoad(fs.readFileSync('metalsmith.yml', 'utf-8'))

metalsmith(__dirname)
  .metadata(m.metadata)
  .source(m.source)
  .destination(m.destination)
  .clean(m.clean)
  .use(collections(m.collections))
  .use(markdown(m.markdown))
  .use(permalinks(m.permalinks))
  .use(twig(m.twig))
  .build(function (err) {
    if (err) throw err
    console.log('Build done')
  })
