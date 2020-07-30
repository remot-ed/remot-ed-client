// HELPER EXAMPLE
// This helper would be used in a .handlebars file
// with the syntax {{limit title 20}}

'use strict'

let i = -1
// accepts arr of questions
const loopEditQuestion = (questions) => {
  i++
  console.log('questions: ', questions[i])
  return questions[i]
}

module.exports = loopEditQuestion
