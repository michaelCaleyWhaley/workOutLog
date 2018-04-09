// TRADITIONAL selection of an object property
// const MongoClient = require('mongodb').MongoClient;

// ES6 object destructuring method of selecting property
// {selects the property of the same name in object} - object destructing
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to DB');
    }
    console.log('Connected to DB successfully');
    const db = client.db('TodoApp');

    // ADD RECORD
    db.collection('Todos').insertOne({
        action: 'Gym',
        completed: false
    }, (err, result) => {
        if (err) {
            return console.log('Unable to add record');
        }
        console.log(result.ops);
    });

    // DELETE RECORD
    // db.collection('Todos').deleteOne({ gym: 'chest' }, (error, result) => {
    //     console.log(result);
    // });

    // FIND RECORD
    // db.collection('Users').findOne({
    //     name: 'michael',
    //     age: 29,
    //     location: 'London'
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to find record');
    //     }
    //     console.log(result);
    // });

    client.close();
});