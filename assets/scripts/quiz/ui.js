'use strict'

const store = require('../store')
const quizApi = require('./api')

const showCreateQuizTemplate = require('../templates/teacher/quiz/quiz-create.handlebars')
const showCreateQuestionTemplate = require('../templates/teacher/quiz/question-create.handlebars')
const showFinishQuizTemplate = require('../templates/teacher/quiz/finish-quiz-screen.handlebars')

const showQuizzesTemplate = require('../templates/teacher/quiz/quiz-td-index.handlebars')
const showQuizTemplate = require('../templates/teacher/quiz/quiz-td-show.handlebars')
const showStudentQuizTemplate = require('../templates/student/quiz/question-show.handlebars')

const showEditQuestionTemplate = require('../templates/teacher/quiz/question-edit.handlebars')
const showQuizEditTemplate = require('../templates/teacher/quiz/quiz-td-edit.handlebars')

const onSuccess = message => {
  $('#user-message')
    .removeClass('failure')
    .addClass('success')
    .text(message)
  $('#user-message').fadeIn().fadeOut(3000)
  $('form').trigger('reset')
}

// const onFailure = message => {
//   $('#user-message')
//     .removeClass('success')
//     .addClass('failure')
//     .text(message)
//   $('#user-message').fadeIn().fadeOut(3000)
//   $('form').trigger('reset')
// }

// Create

const onShowCreateQuizSuccess = (data) => {
  const showCreateQuizHtml = showCreateQuizTemplate()
  $('.create-quiz-button').hide()
  $('.create-quiz').show()
  $('.create-quiz').html(showCreateQuizHtml)
}

const onCreateQuizSuccess = (data) => {
  $('form').trigger('reset')
  store.quizData = data.quiz
  store.questionNumber = 1
  $('.question-count').html('Question ' + store.questionNumber + ' out of ' + store.quizData.numOfQuestions)
  const showCreateQuestionHtml = showCreateQuestionTemplate()
  $('.create-quiz').hide()
  $('.TeacherDash').hide()
  $('.switch-view').hide()
  $('.create-question').show()
  $('.create-question').html(showCreateQuestionHtml)
  onSuccess()
}

const onFinishQuizSuccess = (data) => {
  store.quizData = data
  const showFinishQuizHtml = showFinishQuizTemplate({ quiz: data.quiz })
  $('.create-question').hide()
  $('#finish-quiz-view').html(showFinishQuizHtml)
  $('#finish-quiz-view').show()
}

// Read

const onGetAllQuizzesSuccess = (data) => {
  const showQuizzesHtml = showQuizzesTemplate({ quizzes: data.quizzes })
  $('#quiz_table').html(showQuizzesHtml)
}

const onGetOneQuizSuccess = (data) => {
  const showQuizHtml = showQuizTemplate({ quiz: data.quiz })
  store.quizData = data
  $('#single-quiz-listing').html(showQuizHtml)
  $('#single-quiz-listing').show()
  $('.TeacherDash').hide()
  $('.switch-view').hide()
}

// const onGetOneStudentQuizSuccess = (data) => {
//   const showQuizHtml = showStudentQuizTemplate({ quiz: data.quiz })
//   store.quizData = data
//   $('#student-quiz-view').html(showQuizHtml)
//   $('#student-quiz-view').show()
//   $('#student-class-listing').hide()
//   $('.switch-view').hide()
// }

let aCounter = -1
const onGetOneStudentQuizSuccess = (data) => {
  aCounter++
  if (aCounter === 0) {
    store.quizData = data.quiz
  }
  // note: title is not showing atm
  $('.question-count').html('<h3>' + store.quizData.title + '</h3>')
  $('.question-count').show()
  if (aCounter < store.quizData.questions.length) {
    const showStudentQuizHtml = showStudentQuizTemplate({ question: store.quizData.questions[aCounter] })
    $('#student-quiz-view').html(showStudentQuizHtml)
    $('#student-quiz-view').show()
    $('#student-class-listing').hide()
    $('.switch-view').hide()
    $('.finish-quiz-student').hide()
  } else if (aCounter >= store.quizData.questions.length) {
    store.questions = []
    // store.quizData = data.quiz
    const showStudentQuizHtml = showStudentQuizTemplate({ question: store.quizData.questions[aCounter] })
    $('#student-quiz-view').html(showStudentQuizHtml)
    $('.finish-quiz-student').show()
    $('.answer-question-section').hide()
  }
}

const onGetOneStudentQuizFailure = (data) => {
  // update with messaging shortly
  console.log('failure')
}

// Update

const onGetOneQuizEditSuccess = (data) => {
  const showQuizEditHtml = showQuizEditTemplate({ quiz: data.quiz })
  store.quizData = data.quiz
  $('#single-quiz-listing').html(showQuizEditHtml)
  $('#single-quiz-listing').show()
  $('.TeacherDash').hide()
  $('.switch-view').hide()
}

let qCounter = -1
const onEditQuizSuccess = (data) => {
  qCounter++
  $('.question-count').html('<h3>' + store.quizData.title + '</h3>')
  $('.question-count').show()
  if (qCounter < store.quizData.questions.length) {
    const showQuestionEditHtml = showEditQuestionTemplate({ question: store.quizData.questions[qCounter] })
    $('#single-quiz-listing').hide()
    $('#edit-single-question').html(showQuestionEditHtml)
    $('#edit-single-question').show()
    $('.add-question').hide()
  } else if (qCounter >= store.quizData.questions.length) {
    store.questions = []
    // store.quizData = data.quiz
    const showQuestionEditHtml = showEditQuestionTemplate({ question: store.quizData.questions[qCounter] })
    $('#edit-single-question').html(showQuestionEditHtml)
    $('.add-question').show()
    $('.edit-single-question-section').hide()
  }
}

// Schedule section

const onShowScheduleClassroomsSuccess = (data) => {
  const classDropdown = function () {
    data.classrooms.forEach(function (classroom) {
      // $('.classroom-dropdown').append('<a class="dropdown-item classname-schedule">' + classroom.classname + '</a>')
      $('.classroom-dropdown').append('<a class="dropdown-item classname-schedule"' + ' data-id=' + classroom._id + '>' + classroom.classname + '</a>')
      // $('.classname-schedule').attr('data-id', classroom._id)
    })
  }
  classDropdown()
}

const onEditQuizScheduleSuccess = (data) => {
  $('form').trigger('reset')
  const showQuizHtml = showQuizTemplate({ quiz: data.quiz })
  $('#single-quiz-listing').html(showQuizHtml)
}

const onFinishQuizEditQuizScheduleSuccess = (data) => {
  $('form').trigger('reset')
  const showFinishQuizHtml = showFinishQuizTemplate({ quiz: data.quiz })
  $('#finish-quiz-view').html(showFinishQuizHtml)
}

// Nav section

const onCreateQuizBackSuccess = () => {
  $('.create-quiz-button').show()
  $('.create-quiz').hide()
}

const onSingleQuizToTeacherDashSuccess = () => {
  $('#single-quiz-listing').hide()
  $('.TeacherDash').show()
  $('.switch-view').show()
}

const onSingleClassToStudentDashSuccess = () => {
  $('#student-quiz-view').hide()
  $('#student-class-listing').hide()
  $('.StudentDash').show()
  $('.switch-view').show()
}

const onSingleQuizToClassSuccess = () => {
  $('#student-quiz-view').hide()
  $('#student-class-listing').show()
  $('.switch-view').show()
}

const onFinishQuizToTeacherDashSuccess = () => {
  store.quizData = []
  store.questions = []
  $('#finish-quiz-view').hide()
  quizApi.getAllQuizzes()
    .then(onGetAllQuizzesSuccess)
    .catch(console.error)
  $('.create-quiz-button').show()
  $('.TeacherDash').show()
  $('.switch-view').show()
}

const onFinishQuizEditSuccess = () => {
  store.quizData = []
  store.questions = []
  qCounter = -1
  $('#edit-single-question').hide()
  $('.question-count').hide()
  quizApi.getAllQuizzes()
    .then(onGetAllQuizzesSuccess)
    .catch(console.error)
  $('.TeacherDash').show()
  $('.switch-view').show()
}

module.exports = {
  onCreateQuizSuccess,
  onCreateQuizBackSuccess,
  onFinishQuizSuccess,
  onShowCreateQuizSuccess,
  onGetAllQuizzesSuccess,
  onGetOneQuizSuccess,
  onGetOneStudentQuizSuccess,
  onGetOneStudentQuizFailure,
  onShowScheduleClassroomsSuccess,
  onSingleQuizToTeacherDashSuccess,
  onSingleClassToStudentDashSuccess,
  onSingleQuizToClassSuccess,
  onGetOneQuizEditSuccess,
  onEditQuizSuccess,
  onFinishQuizEditSuccess,
  onEditQuizScheduleSuccess,
  onFinishQuizToTeacherDashSuccess,
  onFinishQuizEditQuizScheduleSuccess
}
