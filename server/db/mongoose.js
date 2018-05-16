var mongoose = require('mongoose');
// Because promises used to be a third party addition to JS you must tell mongoose to use the built in promise
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');
// console.log(process.env.mongoDB_URI);
// mongoose.connect(process.env.MONGODB_URI);

module.exports = {
    mongoose
};