'use strict'

const api = require('./api')
// const ui = require('./ui')
const store = require('../store')
const getFormFields = require('../../../lib/get-form-fields')

const onCreateQuiz = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)

  // onCreateQuiz should store the quiz id in quizId

  api.createQuiz(formData)
    .then(res => store.quizId.push(res.quiz._id))
    .catch(console.error)
}

// on the last question, user will be unable to click 'next question', and
// will click 'finish quiz', and create the final question
// difference will be UI => finish quiz will take user to quiz created view

// when onFinishQuiz runs, we should clear quizId .. maybe in UI?

const onFinishQuiz = event => {
  event.preventDefault()

  api.finishQuiz()
    .then(console.log)
    .catch(console.error)
}

const addHandlers = event => {
  $('#create-quiz').on('submit', onCreateQuiz)
  $('.finish-quiz').on('click', onFinishQuiz)
}

module.exports = {
  addHandlers
}
