'use strict'

const store = require('../store')
// const events = require('./events')

const showClassroomsTemplate = require('../templates/classrooms/class-listing.handlebars')
const showCreateClassTemplate = require('../templates/classrooms/class-create.handlebars')
const showClassTemplate = require('../templates/classrooms/classroom-show.handlebars')
const editClassTemplate = require('../templates/classrooms/classroom-edit.handlebars')

<<<<<<< HEAD
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

const onGetClassesSuccess = (data) => {
  const showClassesHtml = showClassroomsTemplate({ classrooms: data.classrooms })
  $('#classroom_table').html(showClassesHtml)
  $('#student_classroom_table').html(showClassesHtml)
=======
const onGetClassesSuccess = (data) => {
  const showClassesHtml = showClassroomsTemplate({ classrooms: data.classrooms })
  $('#classroom_table').html(showClassesHtml)
>>>>>>> 9dcfdc4a162441b1a97e8302f2bf604aca5bcca4
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

<<<<<<< HEAD
const onAddStudentSuccess = (student) => {
  $('form').trigger('reset')
  onSuccess('The student with email ' + student + ' successfully added')
}

const onAddStudentFailure = (student) => {
  $('form').trigger('reset')
  onFailure('No student with email ' + student + ' found')
=======
const onAddStudentSuccess = () => {
  $('form').trigger('reset')
>>>>>>> 9dcfdc4a162441b1a97e8302f2bf604aca5bcca4
}

const removeStudentSuccess = (target) => {
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
<<<<<<< HEAD
  onAddStudentFailure,
=======
>>>>>>> 9dcfdc4a162441b1a97e8302f2bf604aca5bcca4
  onSingleClassToTeacherDashSuccess,
  onGetClassEditSuccess,
  onSubmitPatchSuccess,
  removeStudentSuccess
}
