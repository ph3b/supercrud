# Supercrud
WIP: A small, opinionated library to generate CRUD handlers for database models.

### Context
Writing route handlers for web applications in Node.js

### Problem
You find yourself writing almost identical CRUD handlers for all your database models.
This includes input-checking, validation, how the model gets created/read/updated/deleted, and the formatted response to the user.
The code is highly imperative and may require some effort to understand for new developers.

### Without Supercrud
```javascript
// Route handler to create a new user in Express
app.post('/user', (req, res) => {
  if(req.body.username && req.body.password){
    // Save user to database
    new DatabaseUser({username: req.body.username, password: req.body.password})
      .save()
      .then((savedUser) => {
        res.send({message: 'User saved.', data: savedUser});
      });
  } 
  else {
    // Handle missing field(s)
  }
})
```

### With Supercrud
```javascript
const handler = create(DatabaseUser, {
  requiredFields: ['username', 'password'],
  after: (savedUser) => ({ message: 'User saved.', data: savedUser})
})


app.post('/user', (req, res) => {
  handler(req.body).then(response => res.send(response))
})
```
or with ```async await```
```javascript
const handler = create(DatabaseUser, {
  requiredFields: ['username', 'password'],
  after: (savedUser) => ({ message: 'User saved.', data: savedUser})
})

app.post('/user', async (req, res) => res.send(await handler(req.body))
```
