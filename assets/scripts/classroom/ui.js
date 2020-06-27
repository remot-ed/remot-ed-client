'use strict'

const store = require('../store')
const events = require('./events')

const showClassroomsTemplate = require('../templates/classrooms/class-listing.handlebars')
const showCreateClassTemplate = require('../templates/classrooms/class-create.handlebars')
const showClassTemplate = require('../templates/classrooms/classroom-show.handlebars')

const onGetClassesSuccess = (data) => {
  const showClassesHtml = showClassroomsTemplate({ classrooms: data.classrooms })
  $('#classroom_table').html(showClassesHtml)
  $('#classroom_table').show()
}

const onGetClassesFailure = () => {
  console.log('classes not got')
}

const onShowCreateClassSuccess = () => {
  const showCreateClassHtml = showCreateClassTemplate()
  $('.create-class-button').hide()
  $('.create-class').show()
  $('.create-class').html(showCreateClassHtml)
}

const onCreateClassSuccess = () => {
}

const onGetClassroomSuccess = (data) => {
  const showClassroomHtml = showClassTemplate({ classroom: data.classroom })
  store.classroomData = data
  $('#single-class-listing').html(showClassroomHtml)
  $('#single-class-listing').show()
  $('#classroom_table').html()
  $('.TeacherDash').hide()
}

const onCreateClassFail = () => {
  console.log('somthings wrong!')
}

const deleteClassroomSuccess = () => {
  $('#single-class-listing').hide()
  $('.TeacherDash').show()
}

module.exports = {
  onGetClassroomSuccess,
  onGetClassesSuccess,
  onGetClassesFailure,
  onShowCreateClassSuccess,
  onCreateClassSuccess,
  onCreateClassFail,
  deleteClassroomSuccess
}
