'use strict'

const api = require('./api')
const ui = require('./ui')
const store = require('../store')
const getFormFields = require('../../../lib/get-form-fields')
const quizApi = require('../quiz/api')
const quizUi = require('../quiz/ui')

const addQuestionCount = () => {
  if (store.questionNumber <= store.quizData.numOfQuestions) {
    $('.question-count').html('Question ' + store.questionNumber + ' out of ' + store.quizData.numOfQuestions)
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
  // once quiz has been updated with array, we want to clear array
  api.createQuestion(formData)
    // .then(res => console.log(res.question._id))
    .then(res => store.questions.push(res.question._id))
    .then(store.questionNumber++)
    .then(addQuestionCount())
    .then(ui.onCreateQuestionSuccess)
    .catch(console.error)
}

const onShowAddQuestion = event => {
  event.preventDefault()

  ui.onShowAddQuestionSuccess()
}

// problem with reAddQuestionIds:
// if you run it more than once, the quizData.questions will always have the
// questions from the quiz as it was BEFORE editing, as we never reassign
// when new questions have been added
// SOLUTION: add store.quizData = data.quiz
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
      .then(res => {
        store.quizData = res.quiz
        quizUi.onEditQuizSuccess(res)
      }))
    .catch(console.error)
}

const onLoopThroughEditQuestions = event => {
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
      // .then(res => store.questions.push(res))
      .then(res => quizUi.onEditQuizSuccess())
      .catch(console.error))
    .catch(console.error)
}

const onLoopThroughAnswerQuestions = event => {
  event.preventDefault()

  const questionId = $(event.target).data('id')
  // console.log('questionId: ', questionId)

  const form = event.target
  const formData = getFormFields(form)
  console.log('formData: ', formData)
  console.log('questionId: ', questionId)

  api.createResponse(questionId, formData)
    .then(res => store.questionResponses.push(res.response))
    .then(quizUi.onGetOneStudentQuizSuccess)
}

const onDeleteQuestion = event => {
  event.preventDefault()

  const questionId = $(event.target).data('id')

  quizApi.getOneQuiz(store.quizData._id)
    .then(res => {
      const questionIndex = res.quiz.questions.findIndex(e => e._id === questionId)
      for (let i = questionIndex + 1; i < res.quiz.questions.length; i++) {
        api.reduceQuestionNumber(res.quiz.questions[i]._id, res.quiz.questions[i].questionNumber)
      }
    })

  api.deleteQuestion(questionId)
    .then(store.quizData.numOfQuestions--)
    .then(api.reduceNumOfQuestions())
    .then(quizApi.getOneQuiz(store.quizData._id)
      .then(res => quizUi.onEditQuizSuccess(res)))
    .catch(console.error)
}

// const onGetAllQuestions = event => {
//   event.preventDefault()
//
//   api.getAllQuestions()
//     .then(console.log)
//     .catch(console.error)
// }
//
// const onGetOneQuestion = event => {
//   event.preventDefault()
//
//   const questionId = $(event.target).data('id')
//
//   api.getOneQuestion(questionId)
//     .then(console.log)
//     .catch(console.error)
// }

const addHandlers = event => {
  // create
  $('.create-question').on('submit', '#create-question', onCreateQuestion)
  $('#student-quiz-view').on('submit', '#answer-question', onLoopThroughAnswerQuestions)

  // $('#edit-single-question').on('submit', '#edit-question', onEditQuestion)
  $('.delete-question').on('submit', onDeleteQuestion)
  // $('.get-questions').on('submit', onGetAllQuestions)
  // $('.get-question').on('submit', onGetOneQuestion)
  $('#edit-single-question').on('click', '.add-question', onShowAddQuestion)
  $('#edit-single-question').on('submit', '#add-new-question', onAddQuestion)
  $('#edit-single-question').on('click', '.delete-question', onDeleteQuestion)
  // $('#edit-single-question').on('click', '.loop-through-qs', onLoopThroughQuestions)
  $('#edit-single-question').on('submit', '#edit-question', onLoopThroughEditQuestions)
}

module.exports = {
  addHandlers
}
