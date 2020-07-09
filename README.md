<!-- [![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# browser-template

A template for starting front-end projects. Webpack for `require` system, build
pipeline, and development server. Boostrap and Handlebars.js included. No
front-end frameworks included.

## Installation

1. [Download](../../archive/master.zip) this template.
    - **Do Not Fork And Clone**
    - Click the "Clone or Download" button and select "Download Zip".
1. Move to the `wdi/projects` directory, then unzip the template directory with
    `unzip /Users/<user-name>/Downloads/browser-template-master.zip`.
1. Rename the template directory from `browser-template-master` to
    `<project-name>-client`.
1. Empty [`README.md`](README.md) and fill with your own content.
1. Replace all instances of `ga-wdi-boston.browser-template` with the name of
    your project.
    - You can search for all instances of text in Atom by pressing
    `commant + shift + f` on Mac or `ctrl + shift + f` on WSL.
1. Move into the new project and `git init`.
1. Add all of the files in your project with the command `git add --all`.
      - **Note: This is the only time you should run this command!**
1. Commit all of your files with the command `git commit`.
      - Your commit title should read `Initial commit`.
1. Install dependencies with `npm install`.
1. Create a new repository on [github.com](https://github.com),
    _not GitHub Enterprise_.
1. Name the new repository with the same name used on Step 3.
1. Follow the instructions on your new repository's setup page. For details on
   how to push to Github, refer to the section on Github entitled "…or push an existing
   repository from the command line." Further documentation can be found [here](https://help.github.com/articles/adding-an-existing-project-to-github-using-the-command-line/).

## Structure

### Scripts

Developers should store JavaScript files in [`assets/scripts`](assets/scripts).
The "manifest" or entry-point is
[`assets/scripts/app.js`](assets/scripts/app.js). In general, only
application initialization goes in this file. It's normal for developers to
start putting all code in this file, but encourage them to break out different
responsibilities and use the `require` syntax put references where they're
needed.

### Config

Developers should set `apiUrls.production` and `apiUrls.development` in
[`assets/scripts/config.js`](assets/scripts/config.js).  With
`apiUrls` set, developers may rely on `apiUrl` as the base for API
URLs.

### Styles

Developers should store styles in [`assets/styles`](assets/styles) and load them
from [`assets/styles/index.scss`](assets/styles/index.scss). Bootstrap version 3 is
included in this template.

### Forms and Using `getFormFields`

Developers should use [getFormFields](get-form-fields.md) to retrieve form data
to send to an API.

### Deployment

To deploy a browser-template based SPA, run `grunt deploy`.

## Adding Images

To add images to your project, you must store them in the `public` directory.
To use the image in HTML or CSS, write the path to the image like this:

```html
<img src="public/cat.jpg">
```
or
```css
#my-cool-div {
  background-image: url('public/cat.jpg')
}
```

Note that there's no `./` or `/` in front of `public/filename.jpg`.

## Adding Fonts

To add custom fonts to your app, you can either use a CDN like Google Fonts, or
you can download the fonts and save them in the `public` directory. If you use
the former method, follow the directions on the website providing the fonts.

For local fonts, put the files in `public`, and then import and use them in a
`.scss` file like this:

```scss
@font-face {
  font-family: 'Nature Beauty';
  src: url('public/Nature-Beauty.ttf') format('truetype');
}

.element-with-custom-font {
  font-family: 'Nature Beauty';
}
```

## Tasks

Developers should run these often!

- `grunt nag` or just `grunt`: runs code quality analysis tools on your code
    and complains
- `grunt make-standard`: reformats all your code in the JavaScript Standard Style
- `grunt <server|serve|s>`: generates bundles, watches, and livereloads
- `grunt build`: place bundled styles and scripts where `index.html` can find
    them
- `grunt deploy`: builds and deploys master branch


## Additional Resources

- [Modern Javascript Explained for Dinosaurs](https://medium.com/@peterxjang/modern-javascript-explained-for-dinosaurs-f695e9747b70)
- [Making Sense of Front End Build Tools](https://medium.freecodecamp.org/making-sense-of-front-end-build-tools-3a1b3a87043b)

## [License](LICENSE)

1. All content is licensed under a CC­BY­NC­SA 4.0 license.
1. All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co. -->

##### *Remot.ed is a work in progress*

# Remot.ed
Remot.ed is an application designed with the current climate in mind. As learning has become virtual, we designed to create an
application for teachers to take their classrooms virtual. Teachers can create virtual classrooms, adding their students to
each classroom. They can also create multiple-choice quizzes, and schedule them in individual classrooms. Teachers will have
additional capabilities, such as adding new questions to an existing quiz, updating/deleting quizzes/questions on quizzes, and classrooms.

Students will be able to take their quizzes when the time they are scheduled for arrives, and teachers will be able to see the grades for each student on each quiz.

[Try Remot.ed Out!](https://remot-ed.github.io/remot-ed-client/)

#### Links
[Back End Repo](https://github.com/remot-ed/remot-ed-backend)

[Deployed API](https://blooming-gorge-31188.herokuapp.com)

[Wireframes](https://xd.adobe.com/view/cada4ca8-c39d-425a-7444-cc7632faea8f-bceb/grid)

#### Technologies Used

1. Javascript
2. HTML
3. CSS
4. Bootstrap
5. jQuery
6. Handlebars
7. Node.js
8. Express.js
9. MongoDB
10. Mongoose


<!-- ### The Process and Problem Solving

We split into teams of two, and would tackle the tasks for the day. This could be as technically complex as building the backend in mongoDB or as creative as styling modals. Depending on the scope of the task, we would often peer program, with one person typing code on their laptop while the other would find and scan useful resources like documentation. When hit with a particularly hard problem, we were able to talk it out together and individually research and test different solutions.

Some of the more challenging aspects were writing the structure needed to get a unique users surveys and connecting user questions to responses. Using regularly planned scrums (usually one before moring, one after lunch) we were able to see where we were at and readjust our goals accordingly. While we faced regular challenges, we had a diverse knowlage of skills that allowed us to share our stregnths. -->
