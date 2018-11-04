require("./config/config.js");

const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const { ObjectId } = require("mongodb");

var { mongoose } = require("./db/mongoose.js");
var { Todo } = require("./models/todo.js");
var { User } = require("./models/user.js");
var { authenticate } = require("./middleware/authenticate.js");

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

// VIEW LAYER
app.set('view engine', 'pug');

app.get('/', (req, res)=>{
  res.render('index', { title: 'Hey', message: 'Hello there!' })
});

// CRUD API
// POST request creating a new todo entry using the Todo model
app.post("/todos", authenticate, (req, res) => {
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });
  todo.save().then(
    doc => {
      res.send(doc);
    },
    error => {
      res.status(400).send(error);
    }
  );
});

// GET request returning all todos
app.get("/todos", authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id
  }).then(
    todos => {
      res.send({ todos });
    },
    error => {
      res.status(400).send(error);
    }
  );
});

// GET request returning todos from specific IDs
app.get("/todos/:id", authenticate, (req, res) => {
  var id = req.params.id;
  if (!ObjectId.isValid(id))
    return res.status(404).send("Must include valid Id in query.");

  Todo.findOne({
    _id: id,
    _creator: req.user._id
  })
    .then(collection => {
      if (collection === null) return res.status(404).send("Todo not found");
      res.send(collection);
    })
    .catch(error => {
      res.status(404).send(error.message);
    });
});

// Delete route
app.delete("/todos/:id", authenticate, async (req, res) => {
  const id = req.params.id;
  // get the ID
  if (!ObjectId.isValid(id)) {
    return res.status(404).send("Invalid ID");
  }
  try {
    // find by id parameter and remove
    const success = await Todo.findOneAndRemove({
      _id: id,
      _creator: req.user._id
    });
    // if no id is found
    if (success === null) throw "ID not found";
    res.status(200).send(success);
  } catch (e) {
    res.status(404).send(e);
  }
});

// UPDATE ROUTE
app.patch("/todos/:id", authenticate, (req, res) => {
  var id = req.params.id;
  // .pick a lodash function which extracts object properties if they exist. List specified in array
  var body = _.pick(req.body, ["text", "completed"]);
  if (!ObjectId.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }
  // $set mongodb operator
  // new is a mongoose option on .findByIdAndUpdate

  // FINDONEANDUPDATE
  Todo.findOneAndUpdate(
    {
      _id: id,
      _creator: req.user._id
    },
    { $set: body },
    { new: true }
  )
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send({ todo });
    })
    .catch(e => {
      res.status(400).send();
    });
});

// POST /users
app.post("/users", async (req, res) => {
  try {
    const userProperties = _.pick(req.body, ["email", "password"]);
    const user = new User(userProperties);
    await user.save();
    const token = await user.generateAuthToken();
    res.header("x-auth", token).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

// retrieves users data
app.get("/users/me", authenticate, (req, res) => {
  res.send(req.user);
});

// A route that allows users to login
// get hashed password from db and compare to password sent in the request
// compare email to users email
app.post("/users/login", async (req, res) => {
  try {
    const body = _.pick(req.body, ["email", "password"]);
    const user = await User.findByCredentials(body.email, body.password);
    const token = await user.generateAuthToken();
    res.header("x-auth", token).send(user);
  } catch (e) {
    res.status(400).send();
  }
});

// Logout route
app.delete("/users/me/token", authenticate, async (req, res) => {
  try {
    await req.user.removeToken(req.token);
    res.status(200).send();
  } catch (e) {
    res.status(400).send();
  }
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = { app };
