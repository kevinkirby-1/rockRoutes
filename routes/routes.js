const routes = require('express').Router()
const routesController = require('../controllers/routes.js')
const validation = require("../middleware/validation.js")
const { requiresAuth } = require('express-openid-connect');


// GET ALL ROUTES
routes.get('/routes', routesController.getALL);

// GET SINGLE ROUTE BY ID
routes.get('/routes/:id', routesController.getSingleRoute)

// CREATE ROUTE
routes.post('/routes', requiresAuth(), validation.validateRoute, routesController.createRoute)

// UPDATE ROUTE BY ID
routes.put('/routes/:id', requiresAuth(), validation.validateRoute, routesController.updateRoute)

// DELETE ROUTE BY ID
routes.delete('/routes/:id', requiresAuth(), routesController.deleteRoute)


module.exports = routes;