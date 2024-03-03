const routes = require('express').Router()
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json')
const routesController = require('../controllers/routes.js')
const validation = require("../middleware/validation.js")
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');

// Auth0 Config
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_SECRET,
    baseURL: process.env.AUTH0_BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL
  };
routes.use(auth(config));
routes.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// SWAGGER DOCS
routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDocument));

// GET ALL ROUTES
routes.get('/routes', routesController.getALL);

// GET SINGLE ROUTE BY ID
routes.get('/routes/:id', routesController.getSingleRoute)

// CREATE ROUTE
routes.post('/routes', requiresAuth, validation.validateRoute, routesController.createRoute)

// UPDATE ROUTE BY ID
routes.put('/routes/:id', requiresAuth, validation.validateRoute, routesController.updateRoute)

// DELETE ROUTE BY ID
routes.delete('/routes/:id', requiresAuth, routesController.deleteRoute)

routes.get('/user', requiresAuth(), routesController.userInfo)

module.exports = routes;