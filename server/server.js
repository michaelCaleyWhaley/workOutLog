var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose.js');
var { Todo } = require('./models/todo.js');
var { User } = require('./models/user.js');

var app = express();

app.use(bodyParser.json());

// POST request creating a new todo entry using the Todo model
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (error) => {
        res.status(400).send(error);
    });
});

// GET request returning all todos
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos });
    }, (error) => {
        res.status(400).send(error);
    });
});

// GET request returning todos from specific IDs
app.get('/todos/:id', (req, res) => {
    if (!req.params.id) return res.send('Must include Id in query.');
    Todo.findById(req.params.id).then((collection) => {
        res.send(collection);
    }).catch((error) => {
        res.status(404).send(error.message);
    });
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = { app };