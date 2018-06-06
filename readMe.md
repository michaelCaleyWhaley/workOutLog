
# Todo app

### Utilising MongoDB


### NOTES ON MONGO

MONGODB is a no SQL DB which mean it does not use a schema/tables. Instead its data is laid out in an array structure with each value being an object full of properties. These properties are generally the same but do not have to be.


### Installing mongoDB

Go to mongodb.com and download relevant version.

1. Extract the folder
2. move to user root
3. rename to mongo
4. Create mongo-data to hold stored data later down the road
5. Open terminal in mongo folder 
6. navigate to bin folder
7. command:  ./mongod --dbpath ~/mongo-data

You should see 'waiting for connections on port 27017' at this point you have an open connection to the database using the mongo-data folder as storage

## To insert a record

1. open a second terminal in the mongo/bin folder
2. command: db.Todos.insert({text: 'Hello Michael'});

## To fetch a result

1. command: db.Todos.find(); - finds all entries in db

### Install GUI for mongoDB called Robo 3T

## Deploy to heroku

First you need to install the heroku addon mongolab do this using command 'heroku addons:create mongolab:sandbox'

### MODULES USED

LODASH - Parsing array, object data
MOCHA - testing framework
SUPERTEST - Abstraction for http requests when testing
NPM Validator - used to validate values in the user model
CRYPTO-JS - encrypts text/objects etc (SHA256 encryption)
JSONWEBTOKEN 