// conexao banco
const mongoose = require('mongoose');
const User = require('../models/user');

mongoose.connect("mongodb+srv://vinicius:2mlwO6wApUbwrIzm@cluster0.iwj8h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", 
{ useNewUrlParser: true }, () =>
console.log("Conectado ao banco")
);
mongoose.Promise = global.Promise;

module.exports = mongoose;