'use strict'

const api = require('./api')
const ui = require('./ui')
const getFormFields = require('../../../lib/get-form-fields')
// const store = require('../store')

const onSignUp = event => {
  event.preventDefault()

  const form = event.target
  const formData = getFormFields(form)

  api.signUp(formData)
    .then(ui.onSignUpSuccess)
    .catch(ui.onSignUpFailure)
}

const onToggleSignUp = () => {
  ui.toggleSignUpSuccess()
}

const onSignIn = event => {
  event.preventDefault()

  const form = event.target
  const formData = getFormFields(form)

  api.signIn(formData)
    .then(ui.onSignInSuccess)
    .catch(ui.onSignInFailure)
}

const onChangePassword = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)

  api.changePassword(formData)
    .then(ui.onChangePasswordSuccess)
    .catch(ui.onChangePasswordFailure)
}

const onSignOut = event => {
  event.preventDefault()

  api.signOut()
    .then(ui.onSignOutSuccess)
    .catch(ui.onSignOutFailure)
}

const onShowChangePassword = event => {
  event.preventDefault()

  ui.onShowChangePasswordSuccess()
}

const onDemoLogin = () => {
  event.preventDefault()

  api.demoSignIn()
    .then(ui.onSignInSuccess)
    .then(console.log(store.user))
    .catch(ui.onSignInFailure)
}

const addHandlers = event => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('#sign-out').on('click', onSignOut)
  $('#new-user').on('click', onToggleSignUp)
  $('#new-user-back').on('click', onToggleSignUp)
  $('.show-change-password').on('click', onShowChangePassword)
  $('#DEMO-LOGIN').on('click', onDemoLogin)
}

module.exports = {
  addHandlers
}
