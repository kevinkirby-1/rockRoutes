const routes = require('express').Router()
const gymsController = require('../controllers/gyms.js')
const validation = require("../middleware/validation.js")
const { requiresAuth } = require('express-openid-connect');

// GET ALL GYMS
routes.get('/gyms', gymsController.getALL);

// GET GYM BY ID
routes.get('/gyms/:id', gymsController.getSingleGym)

//CREATE GYM
routes.post('/gyms', requiresAuth(), validation.validateGym, gymsController.createGym)

// UPDATE GYM BY ID
routes.put('/gym/:id', requiresAuth(), validation.validateGym, gymsController.updateGym)

// DELETE Gym BY ID
routes.delete('/gym/:id', requiresAuth(), gymsController.deleteGym)

module.exports = routes;