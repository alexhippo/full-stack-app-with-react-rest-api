# Full Stack App with React and a REST API

This project is a Full Stack React application utilising the [School Database REST API built in a previous project.](https://github.com/alexhippo/rest-api-sql-v3) Users can use the web interface built with React to:
- sign up
- sign in
- view courses
- create a course (if signed in)
- update their own courses (if authorised)
- delete their own courses (if authorised)

This app was implemented according to the designs specified in the `/mockups` and `/markup` folder.

## Motivation
This project was created as part of the [Treehouse Full Stack Javascript Techdegree](https://teamtreehouse.com/techdegree/full-stack-javascript).

## Technologies used
- Javascript
- Node.js
- Express
- SQLite
- SQL ORM Sequelize
- Postman
- React - React Router, Hooks, Context API
- Authentication

## Getting started

### Downloading
Click on the 'Code' button and clone this project via command line or select 'Download Zip.'

### Installing and running
1. Unzip the zip file if you have downloaded this project as a zip file.
1. Open the folder on the command line, such as Git Bash, Powershell or Terminal.
1. Run `npm install` in both the `api` and `client` folders to install all dependencies to run this project.
1. On the `api` folder, run `npm run seed` to initialise the database with sample data
1. Run `npm start` to start the application.
1. Open your browser/API testing platform and visit [http://localhost:3000](http://localhost:3000).

## Available Scripts
In the project directory, you can run:

### `npm install`
To install and update project dependencies.

### `npm run seed`
To initialise the database with sample data.

### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view the site in the browser.