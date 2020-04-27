'use strict'

// const store = require('../store')
const showClassroomsTemplate = require('../templates/class-listing.handlebars')

const onGetClassesSuccess = (data) => {
  const showClassesHtml = showClassroomsTemplate({ classrooms: data.classrooms })
  $('#classroom_table').html(showClassesHtml)
  $('#classroom_table').show()
}

const onGetClassesFail = () => {
  $('#classroom_table').html('Cannot Find Any Classes')
}
module.exports = {
  onGetClassesSuccess,
  onGetClassesFail
}
