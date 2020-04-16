'use strict'

const config = require('../config')
const store = require('../store')

const createQuiz = formData => {
  return $.ajax({
    url: config.apiUrl + '/quizzes',
    method: 'POST',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    data: formData
  })
}

const finishQuiz = () => {
  return $.ajax({
    url: config.apiUrl + '/quizzes/' + store.quizData[0]._id,
    method: 'PATCH',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    data: {
      quiz: {
        questions: store.questionId
      }
    }
  })
}

module.exports = {
  createQuiz,
  finishQuiz
}
