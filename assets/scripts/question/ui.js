'use strict'

const showAddNewQuestionTemplate = require('../templates/teacher/quiz/add-new-question.handlebars')

const onCreateQuestionSuccess = () => {
  $('form').trigger('reset')
}

const onShowAddQuestionSuccess = () => {
  const showAddNewQuestionHtml = showAddNewQuestionTemplate()
  // $('#edit-single-question').hide()
  // $('.create-question').show()
  $('#edit-single-question').show()
  $('#edit-single-question').html(showAddNewQuestionHtml)
}

module.exports = {
  onCreateQuestionSuccess,
  onShowAddQuestionSuccess
}
