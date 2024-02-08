const routes = require('express').Router()
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('../swagger-output.json')
const routesController = require('../controllers/routes.js')

// GET ALL ROUTES
routes.get('/routes', routesController.getALL);

// GET SINGLE ROUTE BY ID
routes.get('/routes/:id', routesController.getSingleRoute)

// CREATE ROUTE
routes.post('/routes', routesController.createRoute)

// UPDATE ROUTE BY ID
routes.put('/routes/:id', routesController.updateRoute)

// DELETE ROUTE BY ID
routes.delete('/routes/:id', routesController.deleteRoute)

module.exports = routes;