'use strict'

const store = require('../store')
const ui = require('./ui')
const api = require('./api')
const getFormFields = require('../../../lib/get-form-fields')

// get all classes
const getClasses = () => {
  api.getClasses()
    .then(ui.onGetClassesSuccess)
    .catch(ui.onGetClassesFailure)
}

// View Specific Class
const onGetClassroom = (event) => {
  event.preventDefault()

  api.getClassroom($(event.target).data('id'))
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
  api.getStudentId(formData)
    .then(res => console.log('the res is ', res))
    .then(res => store.studentArray.push(res))
    .then(console.log('the studentArray is' + store.studentArray))
    // .then(res => store.studentArray.push(res.xlASSROOM))
    .then(ui.onAddStudentSuccess())
    .catch(console.log('you tried!'))

  /// selected name _ID saved to store

  // const studentsID = api.getStudentId(formData)

  // store.studentArray.push(formData)

  /// else
  /// user send an email?
}

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

// const quizId = $(event.target).data('id')
// api.getOneQuiz(quizId)
//   .then(res => {
//     if (res.quiz.owner === store.user._id) {
//       const questions = res.quiz.questions
//       console.log('questions: ', questions)
//       for (let i = 0; i < questions.length; i++) {
//         if (!questions[i].questionOwner) {
//           questionApi.deleteQuestion(questions[i]._id)
//         }
//       }
//     } else {
//       console.log('you dont own this')
//     }
//   })
// api.getOneQuiz(quizId)
//   .then(res => {
//     if (res.quiz.owner === store.user._id) {
//       api.deleteQuiz(quizId)
//         .then(data => {
//           onGetAllQuizzes(event)
//         })
//     }
//   })
// }

const addHandlers = event => {
  $('.create-class-button').on('click', onShowCreateClass)
  $('.create-class').on('submit', '#add-student-form', onAddStudent)
  $('.create-class').on('submit', '#create-class-form', onCreateNewClass)
  $('#classroom_table').on('click', '.get-classroom', onGetClassroom)
  $('#single-class-listing').on('click', '.delete', onDeleteClassroom) // delete dream
}

module.exports = {
  addHandlers,
  getClasses
}
