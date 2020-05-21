'use strict'

// const store = require('../store')
const showClassroomsTemplate = require('../templates/classrooms/class-listing.handlebars')
const showCreateClassTemplate = require('../templates/classrooms/class-create.handlebars')

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

const onCreateClassFail = () => {
  console.log('somthings wrong!')
}

module.exports = {
  onGetClassesSuccess,
  onGetClassesFail,
  onShowCreateClassSuccess,
  onCreateClassSuccess,
  onCreateClassFail
}
