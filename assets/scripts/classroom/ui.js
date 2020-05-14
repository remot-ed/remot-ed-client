'use strict'

// const store = require('../store')
const showClassroomsTemplate = require('../templates/classrooms/class-listing.handlebars')

const onGetClassesSuccess = (data) => {
  const showClassesHtml = showClassroomsTemplate({ classrooms: data.classrooms })
  $('#classroom_table').html(showClassesHtml)
  $('#classroom_table').show()
}

const onGetClassesFail = () => {
  $('#classroom_table').html('Cannot Find Any Classes')
}

const onCreateClassSuccess = () => {
  $('form').trigger('reset')
  $('.question-count').html('Question ' + store.questionNumber + ' out of ' + store.quizData[0].numOfQuestions)
  const showCreateQuestionHtml = showCreateQuestionTemplate()
  $('.create-quiz').hide()
  $('.create-question').show()
  $('.create-question').html(showCreateQuestionHtml)
  // show create question class
  // hide create quiz class
  // $('.question-count').html('Question ' + questionNumber + ' out of ' + store.quizData[0].numOfQuestions)
}

module.exports = {
  onGetClassesSuccess,
  onGetClassesFail,
  onCreateClassSuccess,
}
