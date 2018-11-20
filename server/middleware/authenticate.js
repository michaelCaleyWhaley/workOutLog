var {User} = require('./../models/user.js');

var authenticate = (req, res, next) => {
    // console.log();
    var token = req.header('x-auth');
    if(req.headers.cookie){
        var xAuthLocation = req.headers.cookie.split('=').indexOf('x-auth');
        token = req.headers.cookie.split('=')[xAuthLocation + 1];
    }

    User.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject();
        }
        req.user = user;
        req.token = token;
        next();
    }).catch((error) => {
        res.status(401).send();
    });
};

module.exports = {authenticate};
