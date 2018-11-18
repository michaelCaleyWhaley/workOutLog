var {User} = require('./../models/user.js');

var authenticate = (req, res, next) => {
    // console.log();
    var token = req.header('x-auth') || req.headers.cookie.split('=')[1];
    User.findByToken(token).then((user) => {
        if (!user) {
            return promise.reject();
        }
        req.user = user;
        req.token = token;
        next();
    }).catch((error) => {
        res.status(401).send();
    });
};

module.exports = {authenticate};
