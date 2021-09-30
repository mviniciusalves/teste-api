// rotas
const express = require('express');
const { MongoCompatibilityError } = require('mongoose/node_modules/mongodb');
const jwt = require('jsonwebtoken')

const authConfig = require('../config/auth.json') 

const User = require('../models/user');

const router = express.Router();

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 172800,
    });
}

router.post('/register', async (req, res) => {
    const { email } = req.body;
    
    try {
        if (await User.findOne({ email }))
            return res.send(400).send({  error: 'Email já existente' });

        const user = await User.create(req.body);

        user.password = undefined;

        return res.send({ user });
    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' });
    }
});

router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email }).select('+password');

    if (!user)
        return res.send(400).send({ error: 'Usuário não encontrado' });

        if (!await User.compare(password, user.password));
        return res.send(401).send({ error: 'Usuário e/ou senha inválidos' });

        user.password = undefined;

        res.send({ 
            user, 
            token: generateToken({ id: user.id}) });
});

module.exports = app => app.use('/auth', router);

