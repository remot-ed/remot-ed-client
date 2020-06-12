'use strict'

const store = require('../store')
const showClassroomsTemplate = require('../templates/classrooms/class-listing.handlebars')
const showCreateClassTemplate = require('../templates/classrooms/class-create.handlebars')
const showClassTemplate = require('../templates/classrooms/classroom-show.handlebars')

const onGetClassesSuccess = (data) => {
  const showClassesHtml = showClassroomsTemplate({ classrooms: data.classrooms })
  $('#classroom_table').html(showClassesHtml)
  $('#classroom_table').show()
}

const onShowCreateClassSuccess = () => {
  const showCreateClassHtml = showCreateClassTemplate()
  $('.create-class-button').hide()
  $('.create-class').show()
  $('.create-class').html(showCreateClassHtml)
}

const onGetClassesFail = () => {
  $('#classroom_table').html('Cannot Find Any Classes')
}

const onCreateClassSuccess = () => {
  console.log('u did it')
}

const onGetClassroomSuccess = (data) => {
  const showClassroomHtml = showClassTemplate({ quiz: data.classroom })
  store.classroomData = data
  $('#single-quiz-listing').html(showClassroomHtml)
  $('#single-quiz-listing').show()
  $('.TeacherDash').hide()
}

const onCreateClassFail = () => {
  console.log('somthings wrong!')
}

module.exports = {
  onGetClassroomSuccess,
  onGetClassesSuccess,
  onGetClassesFail,
  onShowCreateClassSuccess,
  onCreateClassSuccess,
  onCreateClassFail
}
