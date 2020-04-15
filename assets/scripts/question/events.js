'use strict'

const api = require('./api')
// const ui = require('./ui')
const store = require('../store')
const getFormFields = require('../../../lib/get-form-fields')

// declare empty array of questionIds
// as we create questions, we push them to questionId
// when we finish quiz, we update quiz with array of questionIds
// once quiz has been updated with array, we want to clear array .. maybe in UI?
// const questionId = []

// onCreateQuiz should store the quiz id in quizId
// when onFinishQuiz runs, we should clear quizId .. maybe in UI?
// let quizId;

const onCreateQuestion = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)

  // need to get question id? this is what we used in project 3?
  // questionId.push($(event.target).data('id'))
  // console.log(questionId)
  // console.log('formData: ', formData)

  api.createQuestion(formData)
    // .then(res => console.log('res: ', res))
    .then(res => store.questionId.push(res.question._id))
    // .then(res => console.log('id??? ', res.question._id))
    .catch(console.error)
  console.log(store.questionId)
}

// finishQuiz will have almost same functionality as create question
// on the last question, user will be unable to click 'next question', and
// will click 'finish quiz', and create the final question
// difference will be UI => finish quiz will take user to quiz created view

// const onFinishQuiz = event => {
//   event.preventDefault()
//   // const form = event.target
//   // const formData = getFormFields(form)
//
//   // need to also get quiz id that we're adding question to
//   // jk don't need this
//   // const quizId = $(event.target).data('id')
//
//   // api.createQuestion(formData)
//   //   .then(console.log)
//   //   .catch(console.error)
//
//   api.updateQuiz(store.quizId, store.questionId)
//     .then(console.log)
//     .catch(console.error)
// }

const addHandlers = event => {
  $('#create-question').on('submit', onCreateQuestion)
  // $('.finish-quiz').on('submit', onFinishQuiz)
}

module.exports = {
  addHandlers
}
