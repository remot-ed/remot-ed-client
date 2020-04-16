'use strict'

const api = require('./api')
const ui = require('./ui')
const store = require('../store')
const getFormFields = require('../../../lib/get-form-fields')
// const quizEvents = require('../quiz/events')

let questionNumber = 1
//
// if (store.quizData !== {}) {
//   $('.question-count').html('Question ' + questionNumber + ' out of ' + store.quizData[0].numOfQuestions)
//   console.log(store.quizData[0])
// }

const addQuestionCount = () => {
  if (questionNumber <= store.quizData[0].numOfQuestions) {
    console.log('hiyo')
    $('.question-count').html('Question ' + questionNumber + ' out of ' + store.quizData[0].numOfQuestions)
  } else {
    console.log('heyo')
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

  // we want to increment questionNumber
  questionNumber++
  console.log('question id: ', store.questionId)
  addQuestionCount()

  // as we create questions, we push them to empty questionId array in ../store.js
  // when we finish quiz, we update quiz with array of questionIds
  // once quiz has been updated with array, we want to clear array .. maybe in UI?
  api.createQuestion(formData)
    // .then(res => console.log(res.question._id))
    .then(res => store.questionId.push(res.question._id))
    .then(ui.onCreateQuestionSuccess)
    .catch(console.error)
}

// for 'Question 2 of 15', add in line somewhere
// have '15' be variable for numOfQuestions in quiz
// have '2' start off at 1, and then increment

const addHandlers = event => {
  $('#create-question').on('submit', onCreateQuestion)
}

module.exports = {
  addHandlers,
  questionNumber
}
