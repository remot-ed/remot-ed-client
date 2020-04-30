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

module.exports = {
  getClasses
}
