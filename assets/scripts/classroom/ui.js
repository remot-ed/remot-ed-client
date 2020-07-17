'use strict'

const store = require('../store')
// const events = require('./events')

const showClassroomsTemplate = require('../templates/classrooms/class-listing.handlebars')
const showCreateClassTemplate = require('../templates/classrooms/class-create.handlebars')
const showClassTemplate = require('../templates/classrooms/classroom-show.handlebars')
const editClassTemplate = require('../templates/classrooms/classroom-edit.handlebars')

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
  $('.switch-view').hide()
}

const onCreateClassFail = () => {
  console.log('somthings wrong!')
}

const onGetClassEditSuccess = (data) => {
  const editClassroomHtml = editClassTemplate({ classroom: data.classroom })
  console.log(data)
  data.classroom.students.forEach(students => store.studentArray.push(students._id))
  console.log(store.studentArray)
  $('#single-class-listing').html(editClassroomHtml)
  $('#classroom_table').html()
  $('.TeacherDash').hide()
  $('.switch-view').hide()
}

const deleteClassroomSuccess = () => {
  $('#single-class-listing').hide()
  $('.TeacherDash').show()
  $('.switch-view').show()
}

const onAddStudentSuccess = () => {
  $('form').trigger('reset')
}

const onSingleClassToTeacherDashSuccess = () => {
  $('#single-class-listing').hide()
  $('.TeacherDash').show()
  $('.switch-view').show()
}

module.exports = {
  onGetClassroomSuccess,
  onGetClassesSuccess,
  onGetClassesFailure,
  onShowCreateClassSuccess,
  onCreateClassSuccess,
  onCreateClassFail,
  deleteClassroomSuccess,
  onAddStudentSuccess,
  onSingleClassToTeacherDashSuccess,
  onGetClassEditSuccess
}
