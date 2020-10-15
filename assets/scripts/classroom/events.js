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
    .then(res => ui.onCreateClassSuccess(res))
    // .then(getClasses) // Put this in edit too, work on moving it to students
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
  store.studentArray = []

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

  const studentId = store.classroomData.classroom.students.map(user => user._id)

  api.patchClass(classId, formData, studentId)
    .then(res => api.getClassroom(classId))
    .then(res => ui.onSubmitPatchSuccess(res))
    .then(getClasses)
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

  function containStudent (res) {
    if ((store.classroomData.classroom.students).some(student => student.email === res.user.email)) {
      ui.onAddStudentFailure(reqEmail)
    } else {
      store.classroomData.classroom.students.push(res.user)
      ui.onAddStudentSuccess(reqEmail)
    }
  }

  api.getStudentId(formData)
    .then(res => containStudent(res))
    .then(ui.onAddStudentSuccess(reqEmail))
    .catch(ui.onAddStudentFailure(reqEmail))

  /// user send an email?
}

const onAddClassStudents = event => {
  event.preventDefault()
  const form = event.target // form that was submited
  const formData = getFormFields(form) // get that form and run it
  const reqEmail = formData.user.email

  console.log('store is', store)
  function containStudent (res) {
    if ((store.classroomData.classroom.students).some(student => student.email === res.user.email)) {
      ui.onAddStudentFailure(reqEmail)
    } else {
      store.classroomData.classroom.students.push(res.user)
      ui.onAddStudentSuccess(reqEmail)
    }
  }

  api.getStudentId(formData)
    .then(res => containStudent(res))
    .then(ui.onAddNewStudentSuccess(reqEmail))
    .catch(ui.onAddStudentFailure(reqEmail))
}

const onRemoveOneStudent = event => {
  event.preventDefault()

  const dataID = $(event.target).data('id')
  const students = store.classroomData.classroom.students

  for (let i = students.length - 1; i >= 0; --i) {
    if (students[i]._id === (dataID.toString())) {
      students.splice(i, 1)
    }
  }

  ui.removeStudentSuccess()
    .catch(ui.removeStudentFailure)
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
  $('#create-class-students').on('submit', '#add-student-form', onAddClassStudents)

  // Read Requests
  $('#classroom_table').on('click', '.get-classroom', onGetClassroom)
  $('#student-classrooms').on('click', '.student-classroom', onGetStudentClassroom)

  // Update
  $('#single-class-listing').on('click', '.edit-class', onShowEditClass)
  $('#single-class-listing').on('submit', '#patch-class-form', onFinishClassEdit)

  // Delete
  $('#single-class-listing').on('click', '.delete', onDeleteClassroom)

  // Student Management
  $('#single-class-listing').on('submit', '#add-student-form', onAddStudent)
  $('#single-class-listing').on('click', '.btn-Remove-Student', onRemoveOneStudent)

  // misc
  $('#single-class-listing').on('click', '.class-to-teacher-dash', onSingleClassToTeacherDash)
  $('#student-dash-toggle').on('click', toggleStudent)
}

module.exports = {
  addHandlers,
  getClasses,
  onAddClassStudents
}
