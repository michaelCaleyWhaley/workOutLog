var env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
    var config = require('./config.json');
    // selects the correct environment out of the config.json file
    var envConfig = config[env];
    // loops the two properties of the selected env adding the settings from the config.json file to process.env
    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key];
    });
}