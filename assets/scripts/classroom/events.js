'use strict'

const store = require('../store')
const ui = require('./ui')
const api = require('./api')
const getFormFields = require('../../../lib/get-form-fields')

// CREATE

// shows the create class form
const onShowCreateClass = event => {
  event.preventDefault()
  ui.onShowCreateClassSuccess()
}

// create a new classroom from form
const onCreateNewClass = event => {
  event.preventDefault()

  const form = event.target // form that was submited
  const formData = getFormFields(form) // get that form and run it

  api.createClass(formData)
    .then(ui.onCreateClassSuccess)
    // .then(getClasses(event))
    .catch(ui.onCreateClassFail)
}

// READ

// get all classes (Exported and Triggered on Dash)
const getClasses = () => {
  api.getClasses()
    .then(ui.onGetClassesSuccess)
    .catch(ui.onGetClassesFailure)
}

// View one class
const onGetClassroom = (event) => {
  event.preventDefault()

  api.getClassroom($(event.target).data('id'))
    .then(ui.onGetClassroomSuccess)
    .catch(ui.onGetClassroomFailure)
}

const onGetStudentClassroom = (event) => {
  event.preventDefault()

  api.getClassroom($(event.target).data('id'))
    .then(ui.onGetStudentClassroomSuccess)
    .catch(ui.onGetStudentClassroomFailure)
}

// Update

// Shows Class you are editing, to Update a Class
const onShowEditClass = event => {
  event.preventDefault()

  const classId = $(event.target).data('id')
  store.classData = classId

  api.getClassroom(classId)
    .then(ui.onGetClassEditSuccess)
    .catch(console.error)
}

// Submit Updates
const onFinishClassEdit = event => {
  event.preventDefault()

  const classId = store.classData

  const form = event.target
  const formData = getFormFields(form)

  api.patchClass(classId, formData)
    .then(res => api.getClassroom(classId))
    .then(res => ui.onSubmitPatchSuccess(res))
    .catch(console.error)
}

// Delete

// Delete a classroom
const onDeleteClassroom = (event) => {
  event.preventDefault()

  api.deleteClassroom($(event.target).data('id'))
    .then(data => {
      getClasses(event)
    })
    .then(ui.deleteClassroomSuccess)
    .catch(ui.deleteClassroomFail)
}

// Student Management

// Add a student to a class
const onAddStudent = event => {
  event.preventDefault()

  const form = event.target // form that was submited
  const formData = getFormFields(form) // get that form and run it
  const reqEmail = formData.user.email
  /// if FIND email/name Priorety: last
  // if api.getStudentId
  api.getStudentId(formData)
    // turn the res into just the _ID
    .then(res => store.studentArray.push(res.user._id))
    .then(ui.onAddStudentSuccess(reqEmail))
    .catch(ui.onAddStudentFailure(reqEmail))

  /// selected name _ID saved to store

  // const studentsID = api.getStudentId(formData)

  // store.studentArray.push(formData)

  /// else
  /// user send an email?
}

const onRemoveOneStudent = event => {
  event.preventDefault()

  const dataID = $(event.target).data('id') // form that was submited
  const index = store.studentArray.indexOf(dataID.toString())

  if (index !== -1) {
    store.studentArray.splice(index, 1)
    $(event.target).css('background', 'red')
    // change to indicate slated for removal
  } else {
    store.studentArray.push(dataID)
    // change back to checkmark?
    $(event.target).css('background', 'green')
  }
  console.log('student array is', store.studentArray)

  // Dynamically Remove Row/Resource (for now turn red)
  // ui.removeStudentSuccess(target)

  // Code for dynamic form change to reflect store.studentArray
  // api.getStudentId(student)
  //   // turn the res into just the _ID
  //   .then(res => store.studentArray.pop(res.user._id))
  //   .then(res => console.log('student array is', store.studentArray))
  //   // .then(res => fixArray(store.studentArray))
  //   // .then(res => store.studentArray.push(res.xlASSROOM))
  //   // .then(ui.onAddStudentSuccess())
  //   .catch(console.error)
}

// Misc

const toggleStudent = (event) => {

}

const onSingleClassToTeacherDash = () => {
  event.preventDefault()

  ui.onSingleClassToTeacherDashSuccess()
}

const addHandlers = event => {
  // Create
  $('.create-class-button').on('click', onShowCreateClass)
  $('.create-class').on('submit', '#create-class-form', onCreateNewClass)

  // Read Requests
  $('#classroom_table').on('click', '.get-classroom', onGetClassroom)
  $('#student-classrooms').on('click', '.student-classroom', onGetStudentClassroom)

  // Update
  $('#single-class-listing').on('click', '.edit-class', onShowEditClass)
  $('#single-class-listing').on('submit', '#patch-class-form', onFinishClassEdit)

  // Delete
  $('#single-class-listing').on('click', '.delete', onDeleteClassroom)

  // Student Management
  $('.create-class').on('submit', '#add-student-form', onAddStudent)
  $('#single-class-listing').on('submit', '#add-student-form', onAddStudent)
  $('#single-class-listing').on('click', '.btn-Remove-Student', onRemoveOneStudent)

  // misc
  $('#single-class-listing').on('click', '.class-to-teacher-dash', onSingleClassToTeacherDash)
  $('#student-dash-toggle').on('click', toggleStudent)
}

module.exports = {
  addHandlers,
  getClasses
}
