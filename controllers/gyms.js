const { ObjectId } = require('mongodb');
const connection = require('../db/connection');

// GET ALL gyms
const getALL = async (req, res) => {
    db = await connection.getDb();
    try {
        data = db.db('rockRoutes').collection("gyms").find();
        gymsArray = await data.toArray();
        if (!gymsArray.length) {
            throw new Error("No gyms found")
        }
        res.status(200).send(gymsArray);
    } catch (e) {
        res.status(500).send(e.message)
    }
};

// GET GYM BY ID
const getSingleGym = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(500).json("Gym id is not valid.")
    }
    const gymId = new ObjectId(req.params.id);
    db = await connection.getDb();
    try {
        data = db.db("rockRoutes").collection("gyms").find({_id: gymId});
        rgymsArray = await data.toArray();
        if (!gymsArray.length) {
            throw new Error("No gym found")
        }
        res.status(200).send(gymsArray[0]);
    } catch (e) {
        res.status(500).send(e.message)
    }
}

// CREATE GYM
const createGym = async (req, res) => {
    const data = req.body;
    const gym = {
        name: data.name,
        address: data.address,
        phone: data.phone
    };

    db = await connection.getDb();
    try {
        result = await db.db('rockRoutes').collection('gyms').insertOne(gym);
        if (!result.acknowledged) {
            throw new Error("Unable to create gym")
        }
        console.log("gym with id: " + result.insertedId + " created")
        res.status(201).json(result)
    }catch (e) {
        res.status(500).send(e.message)
    }
}

// UPDATE GYM BY ID
const updateGym = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(500).json("Gym id is not valid.")
        return
    }
    const gymId = new ObjectId(req.params.id);
    const data = req.body;
    const gym = {
        name: data.name,
        address: data.address,
        phone: data.phone
    };

    db = await connection.getDb();
    try {
        result = await db.db('rockRoutes').collection('gyms').replaceOne({_id: gymId}, gym);
        if (result.modifiedCount < 1) {
            throw new Error("Unable to modify gym");
        }
        console.log(result.modifiedCount + " document[s] updated.");
        res.status(204).json(result)
    } catch(e) {
        res.status(500).send(e.message)
    }
}

// DELETE GYM BY ID
const deleteGym = async  (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(500).json("Gym id is not valid.");
        return
    }
    const gymId = new ObjectId(req.params.id);
    db = await connection.getDb();
    try {
        result = await db.db('rockRoutes').collection('gyms').deleteOne({_id: gymId})
        if (result.deletedCount < 1) {
            throw new Error("Unable to delete gym.")
        }
        console.log(result.deletedCount + " document[s] deleted")
        res.status(200).send()
    } catch(e) {
        res.status(500).send(e.message)
    }
}

module.exports = {
    getALL,
    getSingleGym,
    createGym,
    updateGym,
    deleteGym
}