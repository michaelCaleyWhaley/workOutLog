const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to DB');
    }
    console.log('Connected to DB successfully');
    const db = client.db('TodoApp');

    // deleteMany
    // db.collection('Todos').deleteMany({completed: true}, (error, response)=>{
    //     if(error){return error;}
    //     console.log(response.result);
    // });

    // deleteOne
    // db.collection('Todos').deleteOne({completed: false}, (error, response)=>{
    //     if(error){return error;}
    //     console.log(response.result);
    // });

    // findOneAndDelete
    db.collection('Todos').findOneAndDelete({ completed: false }, (error, response) => {
        if (error) { return error; }
        console.log(response);
    });

    client.close();
});