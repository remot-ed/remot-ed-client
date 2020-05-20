'use strict'

const store = require('../store')
// const questionEvents = require('../question/events')

const showCreateQuizTemplate = require('../templates/quiz/quiz-create.handlebars')
const showCreateQuestionTemplate = require('../templates/quiz/question-create.handlebars')
const showQuizzesTemplate = require('../templates/quiz/quiz-td-index.handlebars')
const showQuizTemplate = require('../templates/quiz/quiz-td-show.handlebars')

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

const onGetOneQuizSuccess = (data) => {
  const showQuizHtml = showQuizTemplate({ quiz: data.quiz })
  store.quizData = data
  $('#single-quiz-listing').html(showQuizHtml)
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
}
//
// $( "div.demo-container" ).html(function() {
//   var emphasis = "<em>" + $( "p" ).length + " paragraphs!</em>";
//   return "<p>All new content for " + emphasis + "</p>";
// })

const onShowScheduleClassroomsSuccess = (data) => {
  // api.getMyClassrooms()
  //   .then(res => console.log('myclassroomsres: ', res))
  // console.log('data: ', data.classrooms)

  // data.classrooms.forEach(function (classroom) {
  //   return '<p class="dropdown-item">' + classroom.classname + '</p>'
  //   // console.log('data3: ', classroom.classname)
  // })

  // Attempt #1
  // this one displays only the last classroom, aka rewrites over previous classroom
  const classDropdown = function () {
    data.classrooms.forEach(function (classroom) {
      $('.classroom-dropdown').append('<a class="dropdown-item classname-schedule">' + classroom.classname + '</a>')
      $('.classname-schedule').attr('data-id', classroom._id)
    })
  }
  classDropdown()

  // Attempt #2
  // this one doesn't display anything.. it logs each classname, but doesn't display
  // classname in dropdown.
  // but the return statement outside of the forEach function ~will~ display the 'hi'
  // likely doesn't recognize the HTML when it's a function inside a function
  // $('.classroom-dropdown').append(function () {
  //   data.classrooms.forEach(function (classroom) {
  //     console.log(classroom.classname)
  //     return '<a class="dropdown-item">' + classroom.classname + '</a>'
  //     // console.log('data3: ', classroom.classname)
  //   })
  //   // return '<a class="dropdown-item">' + 'hi' + '</a>'
  // })

  // Attempt #3
  // this one will display classroom names in the dropdown, however, as it is an
  // array, displays them as one string
  // aka: "Eng 101, History" in one line
  // const classArray = []
  //
  // $('.classroom-dropdown').html(function () {
  //   data.classrooms.forEach(function (classroom) {
  //     classArray.push(classroom.classname)
  //     console.log(classroom.classname)
  //     // return '<a class="dropdown-item">' + classroom.classname + '</a>'
  //     // console.log('data3: ', classroom.classname)
  //   })
  //   return '<a class="dropdown-item">' + classArray + '</a>'
  // })
}

module.exports = {
  onCreateQuizSuccess,
  onFinishQuizSuccess,
  onShowCreateQuizSuccess,
  onGetAllQuizzesSuccess,
  onGetOneQuizSuccess,
  onShowScheduleClassroomsSuccess
}
