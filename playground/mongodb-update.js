const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to DB');
    }
    console.log('Connected to DB successfully');
    const db = client.db('TodoApp');

    // Course teaches use of $set operator, however works without as below
    // db.collection('Todos').findOneAndUpdate({
    //     action: 'Gym',
    //     completed: false
    // }, {
    //     $set: {
    //         action: 'Gym',
    //         completed: true
    //     }
    //     }).then((response) => {
    //         console.log(response);
    //     }, (err) => {
    //         console.log('Error: ' + err);
    //     });

    // db.collection('Todos').findOneAndUpdate({
    //     action: 'Gym',
    //     completed: false
    // }, {
    //         action: 'Gym',
    //         completed: true
    //     }).then((response) => {
    //         console.log(response);
    //     }, (err) => {
    //         console.log('Error: ' + err);
    //     });


    // Uses $inc function to increment number by desired amount
    db.collection('Users').update(
        { name: 'michael' },
        { $inc: { age: -1 } }
    ).then((response) => {
        console.log(response);
    });

    client.close();
});