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

// getting user id via email
const getStudentId = data => {
  return $.ajax({
    url: config.apiUrl + '/userId',
    method: 'GET',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    data: data
  })
}

const getClassroom = classId => {
  return $.ajax({
    url: config.apiUrl + '/classrooms/' + classId,
    method: 'GET',
    headers: {
      Authorization: `Token token=${store.user.token}`
    }
  })
}

// delete specific dream
const deleteClassroom = classId => {
  return $.ajax({
    url: config.apiUrl + '/classrooms/' + classId,
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${store.user.token}`
    }
  })
}

module.exports = {
  createClass,
  getClasses,
  getStudentId,
  getClassroom,
  deleteClassroom
}
