'use strict'

const onCreateQuestionSuccess = () => {
  $('form').trigger('reset')
  console.log('hello')
}

module.exports = {
  onCreateQuestionSuccess
}
