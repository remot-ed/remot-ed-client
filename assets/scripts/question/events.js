'use strict'

const api = require('./api')
// const ui = require('./ui')
const store = require('../store')
const getFormFields = require('../../../lib/get-form-fields')

const onCreateQuestion = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)

  // as we create questions, we push them to empty questionId array in ../store.js
  // when we finish quiz, we update quiz with array of questionIds
  // once quiz has been updated with array, we want to clear array .. maybe in UI?
  api.createQuestion(formData)
    .then(res => store.questionId.push(res.question._id))
    .catch(console.error)
}

const addHandlers = event => {
  $('#create-question').on('submit', onCreateQuestion)
}

module.exports = {
  addHandlers
}
