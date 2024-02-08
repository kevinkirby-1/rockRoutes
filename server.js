const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use('/', require('./routes/routes'));

const port = 3000;

app.listen(process.env.port || port);
console.log('Web Server is listenting at port '+ (process.env.port || port))