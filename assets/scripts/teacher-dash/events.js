'use strict'
// HANDLES EVENTS
// const api = require('./api')
// const getFormFields = require('../../../lib/get-form-fields')

const store = require('../store')
// const getFormFields = require('../../../lib/get-form-fields')

const showMe = (event) => {
  console.log(store.classroom)
}

const onToggleView = event => {
  $('.StudentDash').toggle()
  $('.TeacherDash').toggle()
  $('.teacher').toggle()
}

const addHandlers = event => {
  $('#show_me_plz').on('click', showMe)
  $('.switch-view').on('click', onToggleView)
}

module.exports = {
  addHandlers
}
