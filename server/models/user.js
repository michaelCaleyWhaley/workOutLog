const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    email: {
        required: true,
        type: String,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: (value) => {
                return validator.isEmail(value);
            },
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email']);
};

// reminder - arrow functions do not bind this keyword
// schema methods are per instance
UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({ _id: user._id.toHexString(), access }, 'abc123').toString();
    user.tokens = user.tokens.concat({ access, token });
    return user.save().then(() => {
        return token;
    });
};

// schema statics are per model
UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (e) {
        return new Promise((resolve, reject) => {
            reject();
        });
    }
    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });

};

// function to find user on login
UserSchema.statics.findByCredentials = function (email, password) {
    var User = this;
    return User.findOne({ email }).then((user) => {
        // if user is not found
        if (!User) {
            return Promise.reject();
        }
        return new Promise((resolve, reject) => {
            // verify password inside here
            // use bcrypt.compare
            bcrypt.compare(password, user.password, function (err, res) {
                if (res) {
                    resolve(user);
                } else {
                    reject(res);
                }
            });
        });
    });
};

// middleware to be executed before each save event
UserSchema.pre('save', function (next) {
    var user = this;
    // generates salt and hash and overwrites string password with hash
    if (user.isModified('password')) {
        var salt = bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

var User = mongoose.model('Users', UserSchema);

module.exports = { User };