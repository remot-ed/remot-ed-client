'use strict'

const api = require('./api')
const questionApi = require('../question/api')
const ui = require('./ui')
const store = require('../store')
const getFormFields = require('../../../lib/get-form-fields')

// TODO:
// create a function that checks if date is in the past or future
// if in the future, throw an error message

const onShowCreateQuiz = event => {
  event.preventDefault()

  ui.onShowCreateQuizSuccess()
}

const onCreateQuiz = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)

  // onCreateQuiz stores the quiz data in empty quizData in ../store.js
  console.log('formData is ', formData)
  api.createQuiz(formData)
    .then(res => store.quizData.push(res.quiz))
    .then(ui.onCreateQuizSuccess)
    .catch(console.error)
}

const onFinishQuiz = event => {
  event.preventDefault()

  api.finishQuiz()
    .then(ui.onFinishQuizSuccess)
    .catch(console.error)
}

const onShowEditQuiz = event => {
  event.preventDefault()
  // calls editQuiz ui
  // ui will hide teacher dash and show edit quiz form
}

// onEditQuizSuccess will have to lead directly into editQuestion
const onEditQuiz = event => {
  event.preventDefault()

  const quizId = $(event.target).data('id')

  const form = event.target
  const formData = getFormFields(form)

  // as part of this API call, when editQuiz is successful, we want to call
  // getOneQuiz, and store the response in store.quizData
  api.editQuiz(quizId, formData)
    .then(console.log)
    .catch(console.error)
}

// delete quiz is going to have to delete questions as well
// maybe before deleteQuiz api call, loop through each question in array,
// and call onDeleteQuestion for each?
// const onDeleteQuiz = event => {
//   event.preventDefault()
//
//   const quizId = $(event.target).data('id')
//   console.log('hi')
//
//   api.deleteQuiz(quizId)
//     .then(console.log)
//     .catch(console.error)
// }

// const onDeleteQuiz = event => {
//   event.preventDefault()
//
//   const quizId = $(event.target).data('id')
//   api.getOneQuiz(quizId)
//     .then(res => {
//       if (res.quiz.owner === store.user._id) {
//         api.deleteQuiz(quizId)
//           .then(data => {
//             onGetAllQuizzes(event)
//           })
//           .then(() => {
//             questionApi.getAllQuestions()
//               .then(res => {
//                 const question = res.questions
//                 for (let i = 0; i < question.length; i++) {
//                   if (!question[i].questionOwner) {
//                     questionApi.deleteQuestion(question[i]._id)
//                   }
//                 }
//               })
//           })
//           .catch(console.error)
//       } else {
//         $('#user-message').html('You do not own this question')
//           .fadeIn().fadeOut(1500)
//       }
//     })
// }

// so... the above function works BUT it deletes too many questions

// get one quiz
// if quiz owner is user id
// loop through res.questions
// call delete question on each
// then delete quiz
const onDeleteQuiz = event => {
  event.preventDefault()

  const quizId = $(event.target).data('id')
  api.getOneQuiz(quizId)
    .then(res => {
      if (res.quiz.owner === store.user._id) {
        const questions = res.quiz.questions
        console.log('questions: ', questions)
        for (let i = 0; i < questions.length; i++) {
          console.log('questions[i]: ', questions[i])
          if (!questions[i].questionOwner) {
            questionApi.deleteQuestion(questions[i])
          }
        }
      } else {
        console.log('you dont own this')
        // $('#user-message').html('You do not own this question')
        //   .fadeIn().fadeOut(1500)
      }
    })
  api.getOneQuiz(quizId)
    .then(res => {
      if (res.quiz.owner === store.user._id) {
        api.deleteQuiz(quizId)
          .then(data => {
            onGetAllQuizzes(event)
          })
      }
    })
}

// const onMyQuizzes = events => {
//   const userId = store.user._id
//   api.getMyQuiz(userId)
//     .then(ui.getMyQuizzesSuccess)
//     .catch(ui.getMyQuizzesFailure)
// }

const onGetAllQuizzes = event => {
//  event.preventDefault()
  // const userId = store.user._id

  api.getAllQuizzes()
    .then(ui.onGetAllQuizzesSuccess)
    .catch(console.error)
}

const onGetOneQuiz = event => {
  event.preventDefault()

  const quizId = $(event.target).data('id')

  api.getOneQuiz(quizId)
    .then(console.log)
    .catch(console.error)
}

const addHandlers = event => {
  $('.create-quiz').on('submit', '#create-quiz', onCreateQuiz)
  $('.create-question').on('click', '.finish-quiz', onFinishQuiz)
  // need to edit once handlebars is integrated
  $('.quiz-listing').on('click', '.edit-quiz-link', onShowEditQuiz)
  $('.edit-quiz').on('submit', onEditQuiz)
  // need to create quiz-listing
  $('.quiz-listing').on('click', '.delete-quiz', onDeleteQuiz)
  // need to edit once handlebars is integrated
  // $('.get-quizzes').on('submit', onGetAllQuizzes)
  // need to edit once handlebars is integrated
  $('.get-quiz').on('submit', onGetOneQuiz)
  $('.create-quiz-button').on('click', onShowCreateQuiz)
}

module.exports = {
  addHandlers,
  onGetAllQuizzes
}
