'use strict'

const api = require('./api')
const ui = require('./ui')
const store = require('../store')
const getFormFields = require('../../../lib/get-form-fields')
// const quizEvents = require('../quiz/events')

// let questionNumber = 1
//
// if (store.quizData !== {}) {
//   $('.question-count').html('Question ' + questionNumber + ' out of ' + store.quizData[0].numOfQuestions)
//   console.log(store.quizData[0])
// }

const addQuestionCount = () => {
  if (store.questionNumber <= store.quizData[0].numOfQuestions) {
    $('.question-count').html('Question ' + store.questionNumber + ' out of ' + store.quizData[0].numOfQuestions)
  } else {
    $('.next-question').prop('disabled', true)
    $('.finish-quiz').prop('disabled', false)
    $('.question-count').html('')
  }
}

const onCreateQuestion = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  // console.log(store.quizData[0])

  // as we create questions, we push them to empty questionId array in ../store.js
  // when we finish quiz, we update quiz with array of questionIds
  // once quiz has been updated with array, we want to clear array .. maybe in UI?
  api.createQuestion(formData)
    // .then(res => console.log(res.question._id))
    .then(res => store.questions.push(res.question))
    .then(store.questionNumber++)
    .then(addQuestionCount())
    .then(ui.onCreateQuestionSuccess)
    .catch(console.error)
}

// TO DO:
// after each edit question, move to next question in questions array for quiz
// note: quiz owner should not be needed, as is already saved to question
const onEditQuestion = event => {
  event.preventDefault()

  const questionId = $(event.target).data('id')

  const form = event.target
  const formData = getFormFields(form)

  api.editQuestion(questionId, formData)
    .then(console.log)
    .catch(console.error)
}

const onDeleteQuestion = event => {
  event.preventDefault()

  const questionId = $(event.target).data('id')

  api.deleteQuestion(questionId)
    .then(console.log)
    .catch(console.error)
}

const onGetAllQuestions = event => {
  event.preventDefault()

  api.getAllQuestions()
    .then(console.log)
    .catch(console.error)
}

const onGetOneQuestion = event => {
  event.preventDefault()

  const questionId = $(event.target).data('id')

  api.getOneQuestion(questionId)
    .then(console.log)
    .catch(console.error)
}

const addHandlers = event => {
  $('.create-question').on('submit', '#create-question', onCreateQuestion)
  $('.edit-question').on('submit', onEditQuestion)
  $('.delete-question').on('submit', onDeleteQuestion)
  $('.get-questions').on('submit', onGetAllQuestions)
  $('.get-question').on('submit', onGetOneQuestion)
}

module.exports = {
  addHandlers
}
