

const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
    id: 10
};

// jwt.sign takes two arguments. One is the data, the second is the salt. 
var token = jwt.sign(data, '123');
var decoded = jwt.verify(token, '123');
console.log(decoded);


// var message = 'I am user number 3';
// var hash = SHA256(message).toString();

// console.log(`Unhashed message ${message}`);
// console.log(`Hashed message ${hash}`);

// var data = {
//     id: 4
// };

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'salting the hash').toString()
// };

// var resultHash = SHA256(JSON.stringify(token.data) + 'salting the hash').toString();

// if (resultHash === token.hash) {
//     console.log('Data was not changed');
// } else {
//     console.log('Data was changed. Do not trust!');
// }