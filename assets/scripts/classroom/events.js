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

// Update

// UNDER CONSTRUCTION , Update a Class
const onShowEditClass = event => {
  event.preventDefault()

  const classId = $(event.target).data('id')

  api.getClassroom(classId)
    .then(ui.onGetClassEditSuccess)
    .catch(console.error)
}

const onEditQuiz = event => {
  event.preventDefault()

  const quizId = store.quizData._id

  const form = event.target
  const formData = getFormFields(form)
  // as part of this API call, when editQuiz is successful, we want to call
  // getOneQuiz, and store the response in store.quizData
  api.editQuiz(quizId, formData)
    .then(api.getOneQuiz(quizId)
      .then(ui.onEditQuizSuccess))
    .catch(console.error)
}

// Submit Updates
const onFinishQuizEdit = event => {
  event.preventDefault()
  ui.onFinishQuizEditSuccess()
  // event.preventDefault()
  // console.log('quizData: ', store.quizData.quiz._id)
  // console.log('store.questions: ', store.questions)
  // api.updateQuestionsInQuiz()
  //   .then(ui.onFinishQuizSuccess)
  //   .then(onGetAllQuizzes(event))
  //   .catch(console.error)
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

  /// if FIND email/name Priorety: last
  // if api.getStudentId
  api.getStudentId(formData)
    // turn the res into just the _ID
    .then(res => store.studentArray.push(res.user._id))
    .then(res => console.log('student array is', store.studentArray))
    // .then(res => fixArray(store.studentArray))
    .then(res => console.log('the res post fix is ', res))
    // .then(res => store.studentArray.push(res.xlASSROOM))
    .then(ui.onAddStudentSuccess())
    .catch(console.error)

  /// selected name _ID saved to store

  // const studentsID = api.getStudentId(formData)

  // store.studentArray.push(formData)

  /// else
  /// user send an email?
}

const onRemoveOneStudent = event => {
  event.preventDefault()
  console.log('click works!')

  const student = event.target._id // form that was submited

  /// if FIND email/name Priorety: last
  // if api.getStudentId
  api.getStudentId(student)
    // turn the res into just the _ID
    .then(res => store.studentArray.pop(res.user._id))
    .then(res => console.log('student array is', store.studentArray))
    // .then(res => fixArray(store.studentArray))
    // .then(res => store.studentArray.push(res.xlASSROOM))
    // .then(ui.onAddStudentSuccess())
    .catch(console.error)
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

  // Update
  $('#single-class-listing').on('click', '.edit-class', onShowEditClass)
  $('#single-quiz-listing').on('submit', '#edit-quiz', onEditQuiz)
  $('#edit-single-question').on('click', '.finish-quiz-edits', onFinishQuizEdit)

  // Delete
  $('#single-class-listing').on('click', '.delete', onDeleteClassroom)

  // Student Management
  $('.create-class').on('submit', '#add-student-form', onAddStudent)
  $('#single-class-listing').on('click', '.btn-Remove-Student', onRemoveOneStudent)

  // misc
  $('#single-class-listing').on('click', '.class-to-teacher-dash', onSingleClassToTeacherDash)
  $('#student-dash-toggle').on('click', toggleStudent)
}

module.exports = {
  addHandlers,
  getClasses
}
