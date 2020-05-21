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
    data: formData,
    students: store.studentArray
  })
}

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
