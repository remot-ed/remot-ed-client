'use strict'

const config = require('../config')
const store = require('../store')

const createQuestion = formData => {
  return $.ajax({
    url: config.apiUrl + '/questions',
    method: 'POST',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    data: {
      question: {
        title: formData.question.title,
        correctAnswer: formData.question.correctAnswer,
        answerTwo: formData.question.answerTwo,
        answerThree: formData.question.answerThree,
        answerFour: formData.question.answerFour,
        quizOwner: store.quizData[0]._id
      }
    }
  })
}

module.exports = {
  createQuestion
}
