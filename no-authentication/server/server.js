require('./config/config.js');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');

var { mongoose } = require('./db/mongoose.js');
var { Todo } = require('./models/todo.js');
var { User } = require('./models/user.js');

var app = express();
const port = process.env.PORT;

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

// index
app.get('/', (req, res) => {
    res.send('Visit /todos or post to that address to store a todo');
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
    if (!ObjectId.isValid(req.params.id)) return res.status(404).send('Must include valid Id in query.');
    Todo.findById(req.params.id).then((collection) => {
        if (collection === null) return res.status(404).send('Todo not found');
        res.send(collection);
    }).catch((error) => {
        res.status(404).send(error.message);
    });
});

// Delete route
app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    // get the ID
    if (!ObjectId.isValid(id)) {
        return res.status(404).send('Invalid ID');
    }
    // find by id parameter and remove
    Todo.findByIdAndRemove(id).then((success) => {
        // if no id is found
        if (success === null) throw 'ID not found';
        res.status(200).send(success);
    }).catch((e) => {
        res.status(404).send(e);
    });
});

// UPDATE ROUTE
app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    // .pick a lodash function which extracts object properties if they exist. List specified in array
    var body = _.pick(req.body, ['text', 'completed']);
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
    Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({ todo });
    }).catch((e) => {
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = { app };