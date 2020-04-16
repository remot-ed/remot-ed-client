'use strict'

const store = require('../store')
const questionEvents = require('../question/events')

// let questionNumber = 1

const onCreateQuizSuccess = () => {
  $('form').trigger('reset')
  $('.question-count').html('Question ' + questionEvents.questionNumber + ' out of ' + store.quizData[0].numOfQuestions)
  // show create question class
  // hide create quiz class
  // $('.question-count').html('Question ' + questionNumber + ' out of ' + store.quizData[0].numOfQuestions)
}

// on the last question, user will be unable to click 'next question', and
// will click 'finish quiz', and create the final question
// difference will be UI => finish quiz will take user to quiz created view
// ^^^ this should go in question UI
// if (questionNumber === store.quizData[0].numOfQuestions) {
// make next question inactive, and finish quiz active
// }

const onFinishQuizSuccess = () => {
  store.quizData = {}
}

module.exports = {
  onCreateQuizSuccess,
  onFinishQuizSuccess
}
