'use strict'

const store = require('../store')
const events = require('./events')
// const events = require('./events')

const showCreateClassTemplate = require('../templates/teacher/classrooms/class-create.handlebars')
const showStudentClassroomsTemplate = require('../templates/student/classrooms/class-listing.handlebars')
const showClassroomsTemplate = require('../templates/teacher/classrooms/class-listing.handlebars')
const showClassTemplate = require('../templates/teacher/classrooms/classroom-show.handlebars')
const showStudentClassTemplate = require('../templates/student/classrooms/classroom-show.handlebars')
const editClassTemplate = require('../templates/teacher/classrooms/classroom-edit.handlebars')

const onSuccess = message => {
  $('#user-message')
    .removeClass('failure')
    .addClass('success')
    .text(message)
  $('#user-message').fadeIn().fadeOut(3000)
  $('form').trigger('reset')
}

const onFailure = message => {
  $('#user-message')
    .removeClass('success')
    .addClass('failure')
    .text(message)
  $('#user-message').fadeIn().fadeOut(3000)
  $('form').trigger('reset')
}

const onShowCreateClassSuccess = () => {
  const showCreateClassHtml = showCreateClassTemplate()
  $('.create-class-button').hide()
  $('.create-class').show()
  $('.create-class').html(showCreateClassHtml)
}

const onCreateClassSuccess = () => {
  onSuccess("You've created a new class")
}

const onGetClassesSuccess = (data) => {
  console.log(data.classrooms)
  const showClassesHtml = showClassroomsTemplate({ classrooms: data.classrooms })
  const showStudentClassroomHTML = showStudentClassroomsTemplate({ classrooms: data.classrooms })
  $('#classroom_table').html(showClassesHtml)
  $('#student-classrooms').html(showStudentClassroomHTML)
  $('#classroom_table').show()
}

const onGetClassesFailure = () => {
  onFailure('Could not retreive classrooms.')
}

const onGetClassroomSuccess = (data) => {
  const showClassroomHtml = showClassTemplate({ classroom: data.classroom })
  store.classroomData = data
  store.studentArray = []
  $('#single-class-listing').html(showClassroomHtml)
  $('#single-class-listing').show()
  $('#classroom_table').html()
  $('.TeacherDash').hide()
  $('.switch-view').hide()
}

const onCreateClassFail = () => {
  console.log('somthings wrong!')
}

const onGetStudentClassroomSuccess = (data) => {
  const showClassroomHtml = showStudentClassTemplate({ classroom: data.classroom })
  store.classroomData = data
  $('#student-class-listing').html(showClassroomHtml)
  $('#student-class-listing').show()
  $('#classroom_table').html()
  $('.StudentDash').hide()
  $('.switch-view').hide()
}

const onGetClassEditSuccess = (data) => {
  // data.classroom.students.forEach(students => store.studentArray.push(students))
  data.classroom = store.classroomData
  console.log(store.classroomData)
  const editClassroomHtml = editClassTemplate({ classroom: store.classroomData.classroom })
  $('#single-class-listing').html(editClassroomHtml)
  $('.TeacherDash').hide()
  $('.switch-view').hide()
}

const onSubmitPatchSuccess = (data) => {
  $('form').trigger('reset')
  const showClassroomHtml = showClassTemplate({ classroom: data.classroom })
  store.classroomData = data
  $('#single-class-listing').html(showClassroomHtml)
  $('#single-class-listing').show()
  $('#classroom_table').html()
}

const deleteClassroomSuccess = () => {
  $('#single-class-listing').hide()
  $('.TeacherDash').show()
  $('.switch-view').show()
}

const onAddStudentSuccess = (student) => {
  $('form').trigger('reset')
  onSuccess('The student with email ' + student + ' successfully added')
}

const onAddStudentFailure = (student) => {
  $('form').trigger('reset')
  onFailure('No student with email ' + student + ' found')
}

const removeStudentSuccess = (target) => {
}

const onSingleClassToTeacherDashSuccess = () => {
  $('#single-class-listing').hide()
  $('.TeacherDash').show()
  $('.switch-view').show()
}

module.exports = {
  onShowCreateClassSuccess,
  onCreateClassSuccess,
  onCreateClassFail,
  onGetClassesSuccess,
  onGetClassesFailure,
  onGetClassroomSuccess,
  onGetStudentClassroomSuccess,
  onGetClassEditSuccess,
  onSubmitPatchSuccess,
  deleteClassroomSuccess,
  onAddStudentSuccess,
  onAddStudentFailure,
  onSingleClassToTeacherDashSuccess,
  removeStudentSuccess
}
