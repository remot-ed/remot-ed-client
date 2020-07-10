'use strict'

const store = require('../store')
const classroom = require('../classroom/events')
const quiz = require('../quiz/events')

const onSuccess = message => {
  $('#user-message')
    .removeClass('failure')
    .addClass('success')
    .text(message)
  $('#user-message').fadeIn().fadeOut(3000)
  $('form').trigger('reset')
}

const onFailure = message => {
  $('#user-message')
    .removeClass('success')
    .addClass('failure')
    .text(message)
  $('#user-message').fadeIn().fadeOut(3000)
  $('form').trigger('reset')
}

const onSignUpSuccess = () => {
  onSuccess('You successfully signed up. Now, sign in.')
}

const onSignUpFailure = () => {
  onFailure('Uh oh... something went wrong! Try again.')
}

const onSignInSuccess = responseData => {
  store.user = responseData.user
  onSuccess('You successfully signed in.')
  $('.before-auth').hide()
  $('.after-auth').show()
  $('.StudentDash').hide()
  $(classroom.getClasses)
  $(quiz.onGetAllQuizzes)
}

const onSignInFailure = () => {
  onFailure('Uh oh... something went wrong! Try again.')
}

const onChangePasswordSuccess = () => {
  onSuccess('You successfully changed your password.')
}

const onChangePasswordFailure = () => {
  onFailure('Uh oh... something went wrong! Try again.')
}

const onSignOutSuccess = () => {
  onSuccess('You successfully signed out.')
  store.user = {}
  store.quizData = []
  store.questions = []
  store.classroomData = []
  store.studentArray = []
  $('.before-auth').show()
  $('.after-auth').hide()
}

const onSignOutFailure = () => {
  onFailure('Uh oh... something went wrong! Try again.')
}

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onChangePasswordSuccess,
  onChangePasswordFailure,
  onSignOutSuccess,
  onSignOutFailure
}
