const routes = require('express').Router()
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json')
const routesController = require('../controllers/routes.js')
const validation = require("../middleware/validation.js")

// SWAGGER DOCS
routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDocument));

// GET ALL ROUTES
routes.get('/routes', routesController.getALL);

// GET SINGLE ROUTE BY ID
routes.get('/routes/:id', routesController.getSingleRoute)

// CREATE ROUTE
routes.post('/routes', validation.validateRoute, routesController.createRoute)

// UPDATE ROUTE BY ID
routes.put('/routes/:id', validation.validateRoute, routesController.updateRoute)

// DELETE ROUTE BY ID
routes.delete('/routes/:id', routesController.deleteRoute)

module.exports = routes;