'use strict'
// HANDLES EVENTS
// const api = require('./api')
// const getFormFields = require('../../../lib/get-form-fields')

const store = require('../store')
// const getFormFields = require('../../../lib/get-form-fields')

const showMe = (event) => {
  console.log(store.classroom)
}

const addHandlers = event => {
  $('#show_me_plz').on('click', showMe)
}

module.exports = {
  addHandlers
}
