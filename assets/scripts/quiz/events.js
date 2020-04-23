'use strict'

const api = require('./api')
const ui = require('./ui')
const store = require('../store')
const getFormFields = require('../../../lib/get-form-fields')

// TODO:
// create a function that checks if date is in the past or future
// if in the future, throw an error message

const onShowCreateQuiz = event => {
  event.preventDefault()

  ui.onShowCreateQuizSuccess()
}

const onCreateQuiz = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)

  // onCreateQuiz stores the quiz data in empty quizData in ../store.js
  console.log('formData is ', formData)
  api.createQuiz(formData)
    .then(res => store.quizData.push(res.quiz))
    .then(ui.onCreateQuizSuccess)
    .catch(console.error)
}

const onFinishQuiz = event => {
  event.preventDefault()

  api.finishQuiz()
    .then(ui.onFinishQuizSuccess)
    .catch(console.error)
}

const onEditQuiz = event => {
  event.preventDefault()

  const quizId = $(event.target).data('id')

  const form = event.target
  const formData = getFormFields(form)

  api.editQuiz(quizId, formData)
    .then(console.log)
    .catch(console.error)
}

// delete quiz is going to have to delete questions as well
// maybe before deleteQuiz api call, loop through each question in array,
// and call onDeleteQuestion for each?
const onDeleteQuiz = event => {
  event.preventDefault()

  const quizId = $(event.target).data('id')

  api.deleteQuiz(quizId)
    .then(console.log)
    .catch(console.error)
}

const onGetAllQuizzes = event => {
  event.preventDefault()

  api.getAllQuizzes()
    .then(console.log)
    .catch(console.error)
}

const onGetOneQuiz = event => {
  event.preventDefault()

  const quizId = $(event.target).data('id')

  api.getOneQuiz(quizId)
    .then(console.log)
    .catch(console.error)
}

const addHandlers = event => {
  $('.create-quiz').on('submit', '#create-quiz', onCreateQuiz)
  $('.create-question').on('click', '.finish-quiz', onFinishQuiz)
  $('.edit-quiz').on('submit', onEditQuiz)
  $('.delete-quiz').on('submit', onDeleteQuiz)
  $('.get-quizzes').on('submit', onGetAllQuizzes)
  $('.get-quiz').on('submit', onGetOneQuiz)
  $('.create-quiz-button').on('click', onShowCreateQuiz)
}

module.exports = {
  addHandlers
}
