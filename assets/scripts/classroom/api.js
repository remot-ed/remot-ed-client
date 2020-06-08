'use strict'

const config = require('../config')
const store = require('../store')

const getClasses = () => {
  return $.ajax({
    url: config.apiUrl + `/classrooms`,
    method: 'GET',
    headers: {
      Authorization: `Token token=${store.user.token}`
    }
  })
}

const createClass = formData => {
  return $.ajax({
    url: config.apiUrl + '/classrooms',
    method: 'POST',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    data: {
      classroom: {
        classname: formData.classroom.classname,
        subject: formData.classroom.subject,
        owner: store.user._id,
        students: store.studentArray
      }
    }
  })
}

// currently unused (for getting id via email)
const getStudentId = formData => {
  return $.ajax({
    url: config.apiUrl + '/userId',
    method: 'GET',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    data: formData
  })
}

module.exports = {
  createClass,
  getClasses,
  getStudentId
}
