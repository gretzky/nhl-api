
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./players.cjs.production.min.js')
} else {
  module.exports = require('./players.cjs.development.js')
}
