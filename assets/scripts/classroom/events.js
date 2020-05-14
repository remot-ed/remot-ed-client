'use strict'

const ui = require('./ui')
const api = require('./api')
const getFormFields = require('../../../lib/get-form-fields')

// get all classes
const getClasses = (event) => {
  api.getClasses()
    .then(ui.onGetClassesSuccess)
    .catch(ui.onGetClassesFailure)
}

// create a new classroom from sub form
const onCreateClass = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)

  // onCreateQuiz stores the quiz data in empty quizData in ../store.js
  console.log('formData is ', formData)
  api.createClass(formData)
    .then(ui.onCreateClassSuccess)
    .catch(console.error)
}

const addHandlers = event => {
  $('.create-class').on('submit', '#create-quiz', onCreateClass)
}

module.exports = {
  addHandlers,
  getClasses
}
