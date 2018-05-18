const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose.js');
const { Todo } = require('./../server/models/todo.js');
const { Users } = require('./../server/models/user.js');

Todo.remove({}).then(((result) => {
    console.log(result);
}));

Todo.findOneAndRemove({ '_id': '5af1a2bf0a183a096ea95da8' }).then((result) => {
    console.log(result);
});

Todo.findByIdAndRemove('5af1a2bf0a183a096ea95da8').then((result) => {
    console.log(result);
});