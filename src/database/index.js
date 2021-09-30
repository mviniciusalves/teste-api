// conexao banco
const mongoose = require('mongoose');
const User = require('../models/user');

mongoose.connect('mongodb://localhost/api_database');
mongoose.Promise = global.Promise;

module.exports = mongoose;