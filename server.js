const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json')

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

const routeRoutes=require("./routes/routes");
const gymRoutes=require("./routes/gyms");

app.use('/', require("./routes/index"));
app.use('/', routeRoutes);
app.use('/', gymRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception Origin ${origin}`);
});


app.listen(process.env.port || port);
console.log('Web Server is listenting at port '+ (process.env.port || port))