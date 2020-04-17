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

const editQuestion = (questionId, formData) => {
  return $.ajax({
    url: config.apiUrl + '/questions/' + questionId,
    method: 'PATCH',
    headers: {
      Authorization: `Token token = ${store.user.token}`
    },
    data: formData
  })
}

const deleteQuestion = questionId => {
  return $.ajax({
    url: config.apiUrl + '/questions/' + questionId,
    method: 'DELETE',
    headers: {
      Authorization: `Token token = ${store.user.token}`
    }
  })
}

const getOneQuestion = questionId => {
  return $.ajax({
    url: config.apiUrl + '/questions/' + questionId,
    method: 'GET',
    headers: {
      Authorization: `Token token = ${store.user.token}`
    }
  })
}

const getAllQuestions = () => {
  return $.ajax({
    url: config.apiUrl + '/questions',
    method: 'GET',
    headers: {
      Authorization: `Token token = ${store.user.token}`
    }
  })
}

module.exports = {
  createQuestion,
  editQuestion,
  deleteQuestion,
  getOneQuestion,
  getAllQuestions
}
