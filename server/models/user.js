var mongoose = require('mongoose');
var Users = mongoose.model('Users', {
    email: {
        required: true,
        type: String,
        trim: true,
        minlength: 1
    }
});

module.exports = {Users};