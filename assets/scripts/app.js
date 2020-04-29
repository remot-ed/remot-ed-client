'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const authEvents = require('./auth/events')
const teacherDashEvents = require('./teacher-dash/events')
const questionEvents = require('./question/events')
const quizEvents = require('./quiz/events')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  authEvents.addHandlers()
  teacherDashEvents.getClasses()
  questionEvents.addHandlers()
  quizEvents.addHandlers()
})
