'use strict'

const store = require('../store')
const quizApi = require('./api')

const showCreateQuizTemplate = require('../templates/quiz/quiz-create.handlebars')
const showCreateQuestionTemplate = require('../templates/quiz/question-create.handlebars')
const showQuizzesTemplate = require('../templates/quiz/quiz-td-index.handlebars')
const showQuizTemplate = require('../templates/quiz/quiz-td-show.handlebars')
const showQuizEditTemplate = require('../templates/quiz/quiz-td-edit.handlebars')
const showEditQuestionTemplate = require('../templates/quiz/question-edit.handlebars')
const showFinishQuizTemplate = require('../templates/quiz/finish-quiz-screen.handlebars')

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
}

const onFinishQuizSuccess = (data) => {
  store.quizData = data
  const showFinishQuizHtml = showFinishQuizTemplate({ quiz: data.quiz })
  $('.create-question').hide()
  $('#finish-quiz-view').show()
  $('#finish-quiz-view').html(showFinishQuizHtml)
}

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
  onShowScheduleClassroomsSuccess,
  onSingleQuizToTeacherDashSuccess,
  onGetOneQuizEditSuccess,
  onEditQuizSuccess,
  onFinishQuizEditSuccess,
  onEditQuizScheduleSuccess,
  onFinishQuizToTeacherDashSuccess,
  onFinishQuizEditQuizScheduleSuccess
}
