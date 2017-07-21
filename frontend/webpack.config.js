function buildConfig (env) {
  if (!env) {
    env = 'dev'
  }
  return require('./webpack.' + env + '.js')(env)
}

module.exports = buildConfig
