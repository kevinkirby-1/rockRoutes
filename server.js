const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use('/', require('./routes/routes'));

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception Origin ${origin}`);
});


app.listen(process.env.port || port);
console.log('Web Server is listenting at port '+ (process.env.port || port))