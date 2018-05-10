var mongoose = require('mongoose');
// Because promises used to be a third party addition to JS you must tell mongoose to use the built in promise
mongoose.Promise = global.Promise;
// mongoose.connect(process.env.mongoDB_URI || 'mongodb://localhost:27017/TodoApp');
mongoose.connect(process.env.mongoDB_URI);

module.exports = {
    mongoose
};