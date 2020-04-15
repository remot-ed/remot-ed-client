'use strict'

const api = require('./api')
// const ui = require('./ui')
const store = require('../store')
const getFormFields = require('../../../lib/get-form-fields')

const onCreateQuiz = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)

  api.createQuiz(formData)
    .then(res => store.quizId.push(res.quiz._id))
    .catch(console.error)
}

const onFinishQuiz = event => {
  event.preventDefault()
  // const form = event.target
  // const formData = getFormFields(form)

  // need to also get quiz id that we're adding question to
  // jk don't need this
  // const quizId = $(event.target).data('id')
  console.log('hello')
  // api.createQuestion(formData)
  //   .then(console.log)
  //   .catch(console.error)
  console.log('quizId: ', store.quizId)
  // console.log('questionId: ', store.questionId)

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
