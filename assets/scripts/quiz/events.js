'use strict'
const api = require('./api')
const questionApi = require('../question/api')
const ui = require('./ui')
const store = require('../store')
const getFormFields = require('../../../lib/get-form-fields')

// TODO:
// create a function that checks if date is in the past or future
// if in the future, throw an error message

// Create

const onShowCreateQuiz = event => {
  event.preventDefault()
  ui.onShowCreateQuizSuccess()
}
const onCreateQuizBack = event => {
  event.preventDefault()
  ui.onCreateQuizBackSuccess()
}
const onCreateQuiz = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  // onCreateQuiz stores the quiz data in empty quizData in ../store.js
  // console.log('formData is ', formData)
  api.createQuiz(formData)
    // .then(res => console.log('after create quiz, store.quizData is: ', store.quizData, 'and res is: ', res.quiz))
    // .then(res => store.quizData.push(res.quiz))
    // .then(ui.onCreateQuizSuccess)
    .then(res => ui.onCreateQuizSuccess(res))
    .catch(console.error)
}
const onFinishQuiz = event => {
  event.preventDefault()
  // console.log('quizData: ', store.quizData)
  api.finishQuiz()
    .then(api.getOneQuiz(store.quizData._id)
      .then(ui.onFinishQuizSuccess))
    .catch(console.error)
}

const onScheduleQuizToClassroom = () => {
  event.preventDefault()
  const classId = $(event.target).data('id')
  const quizId = store.quizData.quiz._id
  // console.log('class ', classId)
  // console.log('quiz ', quizId)
  api.addClassroomToQuiz(quizId, classId)
    .then(console.log)
    .catch(console.error)
  api.addQuizToClassroom(quizId, classId)
    .then(console.log)
    .catch(console.error)
}

// Read

const onGetAllQuizzes = event => {
//  event.preventDefault()
  // const userId = store.user._id
  api.getAllQuizzes()
    .then(ui.onGetAllQuizzesSuccess)
    .catch(console.error)
}
const onGetOneQuiz = event => {
  event.preventDefault()
  const quizId = $(event.target).data('id')
  // console.log(quizId)
  api.getOneQuiz(quizId)
    .then(ui.onGetOneQuizSuccess)
    .catch(console.error)
}

const onGetStudentQuiz = event => {
  event.preventDefault()
  const quizId = $(event.target).data('id')
  // console.log($(event.target).data('id'))
  api.getOneQuiz(quizId)
    .then(ui.onGetOneStudentQuizSuccess)
    .catch(ui.onGetOneStudentQuizFailure)
}

const onShowScheduleClassrooms = () => {
  event.preventDefault()

  api.getMyClassrooms()
    .then(ui.onShowScheduleClassroomsSuccess)
}

// Updates

const onShowEditQuiz = event => {
  event.preventDefault()
  // calls editQuiz ui
  // ui will hide teacher dash and show edit quiz form
  const quizId = $(event.target).data('id')
  api.getOneQuiz(quizId)
    .then(ui.onGetOneQuizEditSuccess)
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

const onMakeQuizActive = event => {
  event.preventDefault()
  const quizId = $(event.target).data('id')
  // const formData = !store.quizData.quiz.isActive
  const form = event.target
  const formData = getFormFields(form)

  api.editQuiz(quizId, formData)
    .then(res => api.getOneQuiz(quizId)
      .then(res => ui.onGetOneQuizSuccess(res)))
    .catch(console.error)
}

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

// onEditQuizSuccess will have to lead directly into editQuestion
const onEditQuizSchedule = event => {
  event.preventDefault()
  const quizId = $('.single-quiz').data('id')
  // console.log('quizId: ', quizId)
  const form = event.target
  const formData = getFormFields(form)
  // as part of this API call, when editQuiz is successful, we want to call
  // getOneQuiz, and store the response in store.quizData
  // api.editQuiz(quizId, formData)
  //   .then(ui.onEditQuizScheduleSuccess)
  //   .catch(console.error)

  api.editQuiz(quizId, formData)
    .then(res => api.getOneQuiz(quizId)
      .then(res => ui.onEditQuizScheduleSuccess(res)))
    .catch(console.error)
}

const onFinishQuizEditQuizSchedule = event => {
  event.preventDefault()
  const quizId = $('.single-quiz').data('id')
  // console.log('quizId: ', quizId)
  const form = event.target
  const formData = getFormFields(form)
  // as part of this API call, when editQuiz is successful, we want to call
  // getOneQuiz, and store the response in store.quizData
  api.editQuiz(quizId, formData)
    .then(res => api.getOneQuiz(quizId)
      .then(res => ui.onFinishQuizEditQuizScheduleSuccess(res)))
    .catch(console.error)
}

// Destroy

// get one quiz
// if quiz owner is user id
// loop through res.questions
// call delete question on each
// then delete quiz
const onDeleteQuiz = event => {
  event.preventDefault()
  const quizId = $(event.target).data('id')
  api.getOneQuiz(quizId)
    .then(res => {
      if (res.quiz.owner === store.user._id) {
        const questions = res.quiz.questions
        // console.log('questions: ', questions)
        for (let i = 0; i < questions.length; i++) {
          if (!questions[i].questionOwner) {
            questionApi.deleteQuestion(questions[i]._id)
          }
        }
      } else {
        console.log('you dont own this')
      }
    })
  api.getOneQuiz(quizId)
    .then(res => {
      if (res.quiz.owner === store.user._id) {
        api.deleteQuiz(quizId)
          .then(data => {
            onGetAllQuizzes(event)
          })
      }
    })
}

// Misc

const onSingleQuizToTeacherDash = () => {
  event.preventDefault()
  ui.onSingleQuizToTeacherDashSuccess()
}

const onSingleClassToStudentDash = () => {
  event.preventDefault()
  ui.onSingleClassToStudentDashSuccess()
}

const onSingleQuizToClassroom = () => {
  event.preventDefault()
  ui.onSingleQuizToClassSuccess()
}

const onFinishQuizToTeacherDash = () => {
  event.preventDefault()

  ui.onFinishQuizToTeacherDashSuccess()
}

const addHandlers = event => {
  // CREATE
  $('.create-quiz-button').on('click', onShowCreateQuiz)
  $('.create-quiz').on('submit', '#create-quiz', onCreateQuiz)
  $('.create-question').on('click', '.finish-quiz', onFinishQuiz)
  $('#single-quiz-listing').on('click', '.classname-schedule', onScheduleQuizToClassroom)
  $('#finish-quiz-view').on('click', '.classname-schedule', onScheduleQuizToClassroom)

  // READ
  $('.quiz-listing').on('click', '.single-quiz-link', onGetOneQuiz)
  $('#student-class-listing').on('click', '.single-quiz-link', onGetStudentQuiz)
  $('#single-quiz-listing').on('click', '.classroom-list-schedule', onShowScheduleClassrooms)
  $('#finish-quiz-view').on('click', '.classroom-list-schedule', onShowScheduleClassrooms)

  // UPDATE
  $('.quiz-listing').on('click', '.edit-quiz-link', onShowEditQuiz)
  $('#single-quiz-listing').on('click', '.edit-quiz-btn', onShowEditQuiz)
  $('#single-quiz-listing').on('submit', '#edit-quiz', onEditQuiz)
  $('#single-quiz-listing').on('submit', '.schedule-quiz', onEditQuizSchedule)
  $('#single-quiz-listing').on('submit', '.make-quiz-active', onMakeQuizActive)
  $('#finish-quiz-view').on('submit', '.schedule-quiz', onFinishQuizEditQuizSchedule)
  $('#edit-single-question').on('click', '.finish-quiz-edits', onFinishQuizEdit)

  // DESTROY
  $('.quiz-listing').on('click', '.delete-quiz', onDeleteQuiz)

  // MISC
  $('.create-quiz').on('click', '.back-to-td', onCreateQuizBack)
  $('#student-quiz-view').on('click', '.quiz-to-class', onSingleQuizToClassroom)
  $('#student-class-listing').on('click', '.class-to-student-dash', onSingleClassToStudentDash)
  $('#single-quiz-listing').on('click', '.quiz-to-teacher-dash', onSingleQuizToTeacherDash)
  $('#finish-quiz-view').on('click', '.finish-quiz-to-teacher-dash', onFinishQuizToTeacherDash)
}

module.exports = {
  addHandlers,
  onGetAllQuizzes
}
