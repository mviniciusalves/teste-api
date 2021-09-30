// conexao banco
const mongoose = require('mongoose');
const User = require('../models/user');

mongoose.connect('mongodb://localhost:3000/api_database');

module.exports = mongoose;