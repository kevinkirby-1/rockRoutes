const { ObjectId } = require('mongodb');
const connection = require('../db/connection');

// GET ALL ROUTES
const getALL = async (req, res) => {
    db = await connection.getDb();
    try {
        data = db.db('rockRoutes').collection("routes").find();
        routesArray = await data.toArray();
        res.status(200).send(routesArray);
    } catch (e) {
        res.status(500).send(e.message)
    }
};

// GET ROUTE BY ID
const getSingleRoute = async (req, res) => {
    const routeId = new ObjectId(req.params.id);
    db = await connection.getDb();
    try {
        data = db.db("rockRoutes").collection("routes").find({_id: routeId});
        contactsArray = await data.toArray();
        res.status(200).send(contactsArray[0]);
    } catch (e) {
        res.status(500).send(e.message)
    }
}

// CREATE ROUTE
const createRoute = async (req, res) => {
    const data = req.body;
    const route = {
        name: data.name,
        grade: data.grade,
        holdColor: data.holdColor,
        setter: data.setter,
        startDate: data.startDate,
        endDate: data.endDate,
        attempts: data.attempts
    };

    db = await connection.getDb();
    try {
        result = await db.db('rockRoutes').collection('routes').insertOne(route);
        console.log("route with id: " + result.insertedId + " created")
        res.status(201).json(result)
    }catch (e) {
        res.status(500).send(e.message)
    }
}

// UPDATE ROUTE BY ID
const updateRoute = async (req, res) => {
    const routeId = new ObjectId(req.params.id);
    const data = req.body;
    const route = {
        name: data.name,
        grade: data.grade,
        holdColor: data.holdColor,
        setter: data.setter,
        startDate: data.startDate,
        endDate: data.endDate,
        attempts: data.attempts
    };

    db = await connection.getDb();
    try {
        result = await db.db('rockRoutes').collection('routes').replaceOne({_id: routeId}, route);
        console.log(result.modifiedCount + " document[s] updated.");
        res.status(204).send()
    } catch(e) {
        res.status(500).send(e.message)
    }
}

// DELETE ROUTE BY ID
const deleteRoute = async  (req, res) => {
    const routeId = new ObjectId(req.params.id);

    db = await connection.getDb();
    try {
        result = await db.db('rockRoutes').collection('routes').deleteOne({_id: routeId})
        console.log(result.deletedCount + " document[s] deleted")
        res.status(200).send()
    } catch(e) {
        res.status(500).send(e.message)
    }
}

module.exports = {
    getALL,
    getSingleRoute,
    createRoute,
    updateRoute,
    deleteRoute
}