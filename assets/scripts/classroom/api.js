'use strict'

const config = require('../config')
const store = require('../store')

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

const getClasses = () => {
  return $.ajax({
    url: config.apiUrl + `/classrooms`,
    method: 'GET',
    headers: {
      Authorization: `Token token=${store.user.token}`
    }
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

const patchClass = (classId, formData, studentId) => {
  return $.ajax({
    url: config.apiUrl + '/classrooms/' + classId,
    method: 'PATCH',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    data: {
      classroom: {
        classname: formData.classroom.classname,
        subject: formData.classroom.subject,
        students: studentId
      }
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

// getting user id via email
const getStudentId = data => {
  return $.ajax({
    url: config.apiUrl + '/studentEmail',
    method: 'GET',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    data: data
  })
}

module.exports = {
  createClass,
  getClasses,
  getClassroom,
  patchClass,
  deleteClassroom,
  getStudentId
}
