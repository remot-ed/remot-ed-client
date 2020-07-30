'use strict'

const api = require('./api')
const ui = require('./ui')
const store = require('../store')
const getFormFields = require('../../../lib/get-form-fields')
const quizApi = require('../quiz/api')
const quizUi = require('../quiz/ui')
// const helper = require('../templates/helpers/edit-question')

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
    .then(res => store.questions.push(res.question._id))
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
  // console.log('questionId: ', questionId)

  const form = event.target
  const formData = getFormFields(form)
  // console.log('formData: ', formData)
  // store.questions.push(formData)

  api.editQuestion(questionId, formData)
  //  .then(formData => store.questions.push(formData))
  //  .then(quizApi.editQuiz(formData))
    .then(api.getOneQuestion(questionId)
      .then(res => store.questions.push(res))
      .catch(console.error))
    .catch(console.error)
}

const onShowAddQuestion = event => {
  event.preventDefault()

  ui.onShowAddQuestionSuccess()
}

const reAddQuestionIds = () => {
  const quiz = store.quizData.questions

  quiz.forEach(function (arrayItem) {
    store.questions.push(arrayItem._id)
  })
}

const onAddQuestion = event => {
  event.preventDefault()

  const form = event.target
  const formData = getFormFields(form)

  reAddQuestionIds()

  api.addQuestion(formData)
    .then(res => api.getOneQuestion(res.question._id)
      .then(res => store.questions.push(res.question._id)))
    .then(res => api.addQuestionToQuiz()
      .then(console.log))
    .then(res => quizApi.getOneQuiz(store.quizData._id)
      .then(res => quizUi.editQuizAfterUpdateQuestions(res)))
    .catch(console.error)
}

const onDeleteQuestion = event => {
  event.preventDefault()

  const questionId = $(event.target).data('id')

  api.deleteQuestion(questionId)
    .then(store.quizData.numOfQuestions--)
    .then(api.reduceNumOfQuestions())
    .then(quizApi.getOneQuiz(store.quizData._id)
      .then(res => quizUi.editQuizAfterUpdateQuestions(res)))
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

// const onLoopThroughQuestions = event => {
//   event.preventDefault()
//   console.log('it worked')
//   helper.loopEditQuestion()
// }

const onLoopThroughQuestions = event => {
  event.preventDefault()
  quizUi.onEditQuizSuccess()
}

const addHandlers = event => {
  $('.create-question').on('submit', '#create-question', onCreateQuestion)
  $('#edit-single-question').on('submit', '#edit-question', onEditQuestion)
  $('.delete-question').on('submit', onDeleteQuestion)
  $('.get-questions').on('submit', onGetAllQuestions)
  $('.get-question').on('submit', onGetOneQuestion)
  $('#edit-single-question').on('click', '.add-question', onShowAddQuestion)
  $('#edit-single-question').on('submit', '#add-new-question', onAddQuestion)
  $('#edit-single-question').on('click', '.delete-question', onDeleteQuestion)
  // $('#edit-single-question').on('click', '.loop-through-qs', onLoopThroughQuestions)
  $('#edit-single-question').on('click', '.increment-questions', onLoopThroughQuestions)
}

module.exports = {
  addHandlers
}
