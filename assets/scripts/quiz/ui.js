'use strict'

const store = require('../store')
// const questionEvents = require('../question/events')

const showCreateQuizTemplate = require('../templates/quiz/quiz-create.handlebars')
const showCreateQuestionTemplate = require('../templates/quiz/question-create.handlebars')
const showQuizzesTemplate = require('../templates/quiz/quiz-td-index.handlebars')

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

// on the last question, user will be unable to click 'next question', and
// will click 'finish quiz', and create the final question
// difference will be UI => finish quiz will take user to quiz created view
// ^^^ this should go in question UI
// if (questionNumber === store.quizData[0].numOfQuestions) {
// make next question inactive, and finish quiz active
// }

const onFinishQuizSuccess = () => {
  store.quizData = []
  store.questionId = []
  $('.create-question').hide()
  $('.create-quiz-button').show()
}

module.exports = {
  onCreateQuizSuccess,
  onFinishQuizSuccess,
  onShowCreateQuizSuccess,
  onGetAllQuizzesSuccess
}
