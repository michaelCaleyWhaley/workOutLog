
// DESTRUCTURE OBJECTS IN ES6

var user = {
    name: 'michael',
    age: 29
};

// Put variable name in curly braces and point to object you want to destructure
var {name} = user;

console.log(name);