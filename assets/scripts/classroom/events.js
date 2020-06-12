'use strict'

const store = require('../store')
const ui = require('./ui')
const api = require('./api')
const getFormFields = require('../../../lib/get-form-fields')

// get all classes
const getClasses = (event) => {
  api.getClasses()
    .then(ui.onGetClassesSuccess)
    .catch(ui.onGetClassesFailure)
}

// View Specific Class
const onGetClassroom = (event) => {
  event.preventDefault()

  api.getClassroom()
    .then(ui.onGetClassroomSuccess)
    .catch(ui.onGetClassroomFailure)
}

// shows the create class form
const onShowCreateClass = event => {
  event.preventDefault()
  ui.onShowCreateClassSuccess()
}

// create a new classroom from sub form
const onCreateNewClass = event => {
  event.preventDefault()

  const form = event.target // form that was submited
  const formData = getFormFields(form) // get that form and run it

  api.createClass(formData)
    .then(ui.onCreateClassSuccess)
    // .then(getClasses(event))
    .catch(ui.onCreateClassFail)
}

// Add a student to a class
const onAddStudent = event => {
  event.preventDefault()

  const form = event.target // form that was submited
  const formData = getFormFields(form) // get that form and run it

  /// if FIND email/name Priorety: last
  // if api.getStudentId
  console.log('the form data is' + formData)
  api.getStudentId(formData)
    .then(res => console.log('res', res))
    // .then(res => store.studentArray.push(res.user._id))
    .catch(console.log('you tried!'))

  /// selected name _ID saved to store

  // const studentsID = api.getStudentId(formData)

  // store.studentArray.push(formData)

  /// else
  /// user send an email?
}

const addHandlers = event => {
  $('.create-class-button').on('click', onShowCreateClass)
  $('.create-class').on('submit', '#add-student-form', onAddStudent)
  $('.create-class').on('submit', '#create-class-form', onCreateNewClass)
  $('#classroom_table').on('click', '.get-classroom', onGetClassroom)
}

module.exports = {
  addHandlers,
  getClasses
}
