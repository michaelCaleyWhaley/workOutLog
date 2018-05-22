var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose.js');
var { Todo } = require('./models/todo.js');
var { User } = require('./models/user.js');

var app = express();
const port = process.env.PORT || 8080;

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
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(404).send('Must include valid Id in query.');
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
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('Invalid ID');
    }
    // find by id parameter and remove
    Todo.findByIdAndRemove(id).then((success) => {
        // if no id is found
        if(success === null) throw 'ID not found';
        res.status(200).send(success);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = { app };