const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to DB');
    }
    console.log('Connected to DB successfully');
    const db = client.db('TodoApp');

    // FIND RECORD
    db.collection('Todos').find().count().then((count)=>{
        console.log(`Todos count: ${count}`);
    }, (err)=>{
        console.log('Error: ' + err);
    });

    client.close();
});