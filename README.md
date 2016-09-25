# Supercrud
[![Build Status](https://travis-ci.org/ph3b/supercrud.svg?branch=master)](https://travis-ci.org/ph3b/supercrud)

*WIP*: A small, opinionated library to generate functional, testable, and readable CRUD handlers for your database models.
Works with any ORM or even raw SQL code as you specify how to create, read, update and delete your models. Can be used with any web framework.

### Context
Writing route handlers for web applications in Node.js

### Problem
You find yourself writing almost identical CRUD handlers for all your database models.
This includes input-checking, validation, how the model gets created/read/updated/deleted, and the formatted response to the user.
The code imperative and may require some effort to understand for new developers.

### Without Supercrud
```javascript
// Route handler to create a new user in Express
app.post('/user', (req, res) => {
  // Check input fields
  if(req.body.username && req.body.password){
    // Save user to database
    new DatabaseUser({username: req.body.username, password: req.body.password})
      .save()
      .then(savedUser => {
        res.send({message: 'User saved.', data: savedUser});
      });
  } 
  else {
    // Handle missing field(s)
  }
})

app.post('/article', addUsernameToRequest, (req, res) => {
  // Check input fields
  if(req.body.title && req.body.text){
    // Save article to database
    new DatabaseArticle({title: req.body.title, text: req.body.text, created_by: req.username })
      .save()
      .then(savedArticle => {
        res.send({message: 'Article saved.', data: savedArticle});
      });
  } 
  else {
    // Handle missing field(s)
  }
})
```

### With Supercrud
```javascript
// 1. Define your save function. (See other examples for update, deleted and get functions.)
// This is done only once and will work for all of your models assuming they have the same methods.
// You may export the CRUD object if you like to manage distinct models in seperate files.

import Supercrud from 'supercrud';

const CRUD = Supercrud({
  saveFunction: (model, modelObject) => new model(modelObject).save()
});


// 2. Create your handlers. The returned handlers will call your saveFunction.

const userHandler = CRUD.create(DatabaseUser, {
  // Check the input
  requiredFields: ['username', 'password'],
  // This is called after the user has been saved. Specify return format.
  after: savedUser => ({ message: 'User saved.', data: savedUser})
})

const articleHandler = CRUD.create(DatabaseArticle, {
  requiredFields: ['title', 'text'],
  // Don't allow the user to speficy anyone other than title and text
  allowedFields: ['title', 'text'],
  // This is called before we save it to the database.
  before: (body, request) => Object.assign({}, body, { created_by: req.username }),
  after: savedUser => ({ message: 'User saved.', data: savedUser})
})

// 3. Hook it up to Express, Restify or whatever web framework you use.

app.post('/user', (req, res) => {
  userHandler(req.body).then(response => res.send(response))
})
app.post('/article', addUsernameToRequest, (req, res) => {
  articleHandler(req.body).then(response => res.send(response))
})
```
or with ```async await```
```javascript
app.post('/user', async (req, res) => res.send(await userHandler(req.body))
app.post('/article', addUsernameToRequest, async (req, res) => res.send(await articleHandler(req.body))
```
