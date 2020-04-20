'use strict'

// const store = require('../store')
const showClassroomsTemplate = require('../templates/class-listing.handlebars')

const onGetClassesSuccess = (data) => {
  const showClassesHtml = showClassroomsTemplate({ class: data.class })
  $('.classroom_table').html(showClassesHtml)
  $('.classroom_table').show()
}

const onGetClassesFail = () => {
  $('#classroom_table').html('Cannot Find Any Classes')
}
module.exports = {
  onGetClassesSuccess,
  onGetClassesFail
}

// <script type="text/x-handlebars-template" id="tableTemplate">
// <table class="table">
// <thead>
// <tr>
// <th scope="col">Classroom</th>
// <th scope="col">#Students</th>
// <th scope="col">Edit</th>
// </tr>
// </thead>
// <tbody>
//   {{#each classrooms as |class|}}
//     {{log class}}
//       <tr class="class_listing">
//         <th scope="row">{{class.classname}}</th>
//         <td>{{class.students}}</td>
//   <td>{{class.subject}}</td>
//       </tr>
//   {{/each}}
// </tbody>
// </table>
// </script>
