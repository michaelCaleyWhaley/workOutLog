var {User} = require('./../models/user.js');

var authenticate = (req, res, next) => {
    var token = req.header('x-auth');
    User.findByToken(token).then((user) => {
        if (!user) {
            return promise.reject();
        }
        req.user = user;
        req.token = token;
    }).catch((error) => {
        res.status(401).send();
    });
    next();
};

module.exports = {authenticate};