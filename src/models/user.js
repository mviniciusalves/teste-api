// model de usuário
const mongoose = require('../database')
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String,  unique: true, required: true, lowercase:true },
    password: { type: String, required: true, select: false },
    phone: { type: Number, max: 11, },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
    logonAt: { type: Date, default: Date.now },
    token: { type: Number }
});

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
})

const User = mongoose.model('User', UserSchema);

module.exports = User;