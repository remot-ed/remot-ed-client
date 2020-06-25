'use strict'

const store = require('../store')
const quizApi = require('./api')

const showCreateQuizTemplate = require('../templates/quiz/quiz-create.handlebars')
const showCreateQuestionTemplate = require('../templates/quiz/question-create.handlebars')
const showQuizzesTemplate = require('../templates/quiz/quiz-td-index.handlebars')
const showQuizTemplate = require('../templates/quiz/quiz-td-show.handlebars')
const showQuizEditTemplate = require('../templates/quiz/quiz-td-edit.handlebars')
const showEditQuestionTemplate = require('../templates/quiz/question-edit.handlebars')

// let questionNumber = 1

const onShowCreateQuizSuccess = (data) => {
  const showCreateQuizHtml = showCreateQuizTemplate()
  $('.create-quiz-button').hide()
  $('.create-quiz').show()
  $('.create-quiz').html(showCreateQuizHtml)
  // show create question class
  // hide create quiz class
  // $('.question-count').html('Question ' + questionNumber + ' out of ' + store.quizData[0].numOfQuestions)
}

const onCreateQuizSuccess = () => {
  $('form').trigger('reset')
  store.questionNumber = 1
  $('.question-count').html('Question ' + store.questionNumber + ' out of ' + store.quizData[0].numOfQuestions)
  const showCreateQuestionHtml = showCreateQuestionTemplate()
  $('.create-quiz').hide()
  $('.TeacherDash').hide()
  $('.create-question').show()
  $('.create-question').html(showCreateQuestionHtml)
  // show create question class
  // hide create quiz class
  // $('.question-count').html('Question ' + questionNumber + ' out of ' + store.quizData[0].numOfQuestions)
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
}
const onGetOneQuizEditSuccess = (data) => {
  const showQuizEditHtml = showQuizEditTemplate({ quiz: data.quiz })
  store.quizData = data.quiz
  $('#single-quiz-listing').html(showQuizEditHtml)
  $('#single-quiz-listing').show()
  $('.TeacherDash').hide()
}

const onEditQuizSuccess = (data) => {
  const showQuestionEditHtml = showEditQuestionTemplate({ quiz: data.quiz })
  $('#single-quiz-listing').hide()
  $('#edit-single-question').html(showQuestionEditHtml)
  $('#edit-single-question').show()
  // show edit question for first question in array
  // on save question, show edit question for next question in array
  // if question is last question in array
  //   then disable save question, and enable finish
  // on finish edits, save question & call get one quiz
}

const editQuizAfterUpdateQuestions = (data) => {
  const showQuestionEditHtml = showEditQuestionTemplate({ quiz: data.quiz })
  $('#edit-single-question').html('')
  $('#edit-single-question').html(showQuestionEditHtml)
}

// on the last question, user will be unable to click 'next question', and
// will click 'finish quiz', and create the final question
// difference will be UI => finish quiz will take user to quiz created view
// ^^^ this should go in question UI
// if (questionNumber === store.quizData[0].numOfQuestions) {
// make next question inactive, and finish quiz active
// }

const onFinishQuizSuccess = () => {
  store.quizData = []
  store.questions = []
  $('.create-question').hide()
  $('.create-quiz-button').show()
  $('.TeacherDash').show()
}

const onFinishQuizEditSuccess = () => {
  store.quizData = []
  store.questions = []
  $('#edit-single-question').hide()
  quizApi.getAllQuizzes()
    .then(onGetAllQuizzesSuccess)
    .catch(console.error)
  $('.TeacherDash').show()
}

const onShowScheduleClassroomsSuccess = (data) => {
  const classDropdown = function () {
    data.classrooms.forEach(function (classroom) {
      $('.classroom-dropdown').append('<a class="dropdown-item classname-schedule">' + classroom.classname + '</a>')
      $('.classname-schedule').attr('data-id', classroom._id)
    })
  }
  classDropdown()
}

const onSingleQuizToTeacherDashSuccess = () => {
  $('#single-quiz-listing').hide()
  $('.TeacherDash').show()
}

module.exports = {
  onCreateQuizSuccess,
  onFinishQuizSuccess,
  onShowCreateQuizSuccess,
  onGetAllQuizzesSuccess,
  onGetOneQuizSuccess,
  onShowScheduleClassroomsSuccess,
  onSingleQuizToTeacherDashSuccess,
  onGetOneQuizEditSuccess,
  onEditQuizSuccess,
  onFinishQuizEditSuccess,
  editQuizAfterUpdateQuestions
}
