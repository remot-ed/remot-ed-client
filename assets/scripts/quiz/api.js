'use strict'

const config = require('../config')
const store = require('../store')

const createQuiz = formData => {
  return $.ajax({
    url: config.apiUrl + '/quizzes',
    method: 'POST',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    data: formData
  })
}

const finishQuiz = () => {
  return $.ajax({
    url: config.apiUrl + '/quizzes/' + store.quizData[0]._id,
    method: 'PATCH',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    data: {
      quiz: {
        questions: store.questions
      }
    }
  })
}

const addClassroomToQuiz = (quizId, classroomId) => {
  return $.ajax({
    url: config.apiUrl + '/quizzes/' + quizId,
    method: 'PATCH',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    data: {
      quiz: {
        classroom: classroomId
      }
    }
  })
}

const addQuizToClassroom = (quizId, classroomId) => {
  return $.ajax({
    url: config.apiUrl + '/classrooms/' + classroomId,
    method: 'PATCH',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    data: {
      classroom: {
        quizzes: quizId
      }
    }
  })
}

const editQuiz = (quizId, formData) => {
  return $.ajax({
    url: config.apiUrl + '/quizzes/' + quizId,
    method: 'PATCH',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    data: formData
  })
}

const deleteQuiz = quizId => {
  return $.ajax({
    url: config.apiUrl + '/quizzes/' + quizId,
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${store.user.token}`
    }
  })
}

const getOneQuiz = quizId => {
  return $.ajax({
    url: config.apiUrl + '/quizzes/' + quizId,
    method: 'GET',
    headers: {
      Authorization: `Token token=${store.user.token}`
    }
  })
}

const getAllQuizzes = () => {
  return $.ajax({
    url: config.apiUrl + '/quizzes',
    method: 'GET',
    headers: {
      Authorization: `Token token=${store.user.token}`
    }
  })
}

const getMyClassrooms = () => {
  return $.ajax({
    url: config.apiUrl + '/myclassrooms/' + store.user._id,
    method: 'GET',
    headers: {
      Authorization: `Token token=${store.user.token}`
    }
  })
}

module.exports = {
  createQuiz,
  finishQuiz,
  editQuiz,
  deleteQuiz,
  getOneQuiz,
  getAllQuizzes,
  getMyClassrooms,
  addClassroomToQuiz,
  addQuizToClassroom
}
