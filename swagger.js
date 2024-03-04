const options = {
  autoHeaders: true
}
const swaggerAutogen = require('swagger-autogen')(options);

const doc = {
  info: {
    title: 'Rock Routes API',
    description: 'Rock Routes API'
  },
  host: 'localhost:3000',
  schemes: ['http']
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js', './routes/routes.js', './routes/gyms.js'];

swaggerAutogen(outputFile, routes, doc);