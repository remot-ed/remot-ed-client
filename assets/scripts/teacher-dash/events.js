'use strict'
// HANDLES EVENTS
// const api = require('./api')
// const getFormFields = require('../../../lib/get-form-fields')
const ui = require('./ui')
const api = require('./api')
// const getFormFields = require('../../../lib/get-form-fields')

const getClasses = (event) => {
  event.preventDefault()

  api.getClasses()
    .then(ui.onGetClassesSuccess)
    .catch(ui.onGetClassesFailure)
}

// to steamline the module.exports
const addHandlers = event => {
  $('#getclass').on('click', getClasses)
}

module.exports = {
  addHandlers
}
