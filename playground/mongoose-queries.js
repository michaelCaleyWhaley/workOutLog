const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose.js');
const { Todo } = require('./../server/models/todo.js');
const { Users } = require('./../server/models/user.js');

// var id = '5ae08ff6ac1f852f9796f136';

// if(!ObjectID.isValid(id)){
//     console.log('ID not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     if (!todo) { return console.log.log('Id not found'); }
//     console.log('Todo by Id', todo);
// }).catch((e) => {
//     console.log(e);
// });

Users.find().then((user) => {
    console.log(Users);
});