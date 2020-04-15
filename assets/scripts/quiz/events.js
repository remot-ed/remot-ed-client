'use strict'

const api = require('./api')
// const ui = require('./ui')
const getFormFields = require('../../../lib/get-form-fields')

const onCreateQuestion = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)

  // need to get question id? this is what we used in project 3?
  const questionId = $(event.target).data('id')
  // need to also get quiz id that we're adding question to
  const quizId = // ?

  api.createQuestion(formData)
    .then(console.log)
    .catch(console.error)

  api.updateQuiz(quizId, questionId)
    .then(console.log)
    .catch(console.error)
}

// finishQuiz will have almost same functionality as create question
// on the last question, user will be unable to click 'next question', and
// will click 'finish quiz', and create the final question
// difference will be UI => finish quiz will take user to quiz created view

const onFinishQuiz = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)

  // need to get question id? this is what we used in project 3?
  const questionId = $(event.target).data('id')
  // need to also get quiz id that we're adding question to
  const quizId = // ?

  api.createQuestion(formData)
    .then(console.log)
    .catch(console.error)

  api.updateQuiz(quizId, questionId)
    .then(console.log)
    .catch(console.error)
}

const addHandlers = event => {
  $('#create-question').on('submit', onCreateQuestion)
  $('.finish-quiz').on('submit', onFinishQuiz)
}

module.exports = {
  addHandlers
}
