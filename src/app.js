// app core
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./controllers/authController')(app);

app.listen(port, () => console.log(`App listening on port ${port}!`));