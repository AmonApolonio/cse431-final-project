const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const addActor = async (req, res) => {
    //#swagger.tags = ['Actors']
    try {
        const movies = Array.isArray(req.body.movies) 
            ? req.body.movies.map(id => ObjectId.createFromHexString(id)) 
            : [];

        const actor = {
            name: req.body.name,
            bio: req.body.bio,
            birthDate: new Date(req.body.birthDate),
            movies: movies
        };

        const response = await mongodb.getDatabase().db().collection('actors').insertOne(actor);

        if (response.acknowledged) {
            res.status(201).json({ message: "Actor added successfully", actorId: response.insertedId });
        } else {
            res.status(500).json({ message: "Failed to add actor" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error adding actor", error: err.message });
    }
};

const getAllActors = async (req, res) => {
    //#swagger.tags = ['Actors']
    try {
        const actors = await mongodb.getDatabase().db().collection('actors').find().toArray();
        res.status(200).json(actors);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving actors", error: err.message });
    }
};

const getActorById = async (req, res) => {
    //#swagger.tags = ['Actors']
    try {
        const actorId = ObjectId.createFromHexString(req.params.id);
        const actor = await mongodb.getDatabase().db().collection('actors').findOne({ _id: actorId });

        if (!actor) {
            res.status(404).json({ message: "Actor not found" });
        } else {
            res.status(200).json(actor);
        }
    } catch (err) {
        res.status(500).json({ message: "Error retrieving actor", error: err.message });
    }
};

const updateActor = async (req, res) => {
    //#swagger.tags = ['Actors']
    try {
        const actorId = ObjectId.createFromHexString(req.params.id);
        const updatedActor = {
            name: req.body.name,
            bio: req.body.bio,
            birthDate: new Date(req.body.birthDate),
            movies: req.body.movies.map(id => ObjectId.createFromHexString(id))
        };

        const response = await mongodb.getDatabase().db().collection('actors').updateOne({ _id: actorId }, { $set: updatedActor });

        if (response.modifiedCount > 0) {
            res.status(200).json({ message: "Actor updated successfully" });
        } else {
            res.status(404).json({ message: "Actor not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error updating actor", error: err.message });
    }
};

const deleteActor = async (req, res) => {
    //#swagger.tags = ['Actors']
    try {
        const actorId = ObjectId.createFromHexString(req.params.id);
        const response = await mongodb.getDatabase().db().collection('actors').deleteOne({ _id: actorId });

        if (response.deletedCount > 0) {
            res.status(200).json({ message: "Actor deleted successfully" });
        } else {
            res.status(404).json({ message: "Actor not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error deleting actor", error: err.message });
    }
};

module.exports = {
    addActor,
    getAllActors,
    getActorById,
    updateActor,
    deleteActor
};
