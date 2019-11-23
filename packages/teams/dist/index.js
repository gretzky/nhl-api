
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./teams.cjs.production.min.js')
} else {
  module.exports = require('./teams.cjs.development.js')
}
