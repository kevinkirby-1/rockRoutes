const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Rock Routes API',
    description: 'Rock Routes API'
  },
  host: 'rockroutes.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger-output.json';
const routes = ['./routes/routes.js'];

swaggerAutogen(outputFile, routes, doc);