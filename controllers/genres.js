const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const addGenre = async (req, res) => {
    //#swagger.tags = ['Genres']
    try {
        const genre = {
            name: req.body.name,
            description: req.body.description || null
        };

        const response = await mongodb.getDatabase().db().collection('genres').insertOne(genre);

        if (response.acknowledged) {
            res.status(201).json({ message: "Genre added successfully", genreId: response.insertedId });
        } else {
            res.status(500).json({ message: "Failed to add genre" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error adding genre", error: err.message });
    }
};

const getAllGenres = async (req, res) => {
    //#swagger.tags = ['Genres']
    try {
        const genres = await mongodb.getDatabase().db().collection('genres').find().toArray();
        res.status(200).json(genres);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving genres", error: err.message });
    }
};

const getGenreById = async (req, res) => {
    //#swagger.tags = ['Genres']
    try {
        const genreId = ObjectId.createFromHexString(req.params.id);
        const genre = await mongodb.getDatabase().db().collection('genres').findOne({ _id: genreId });

        if (!genre) {
            res.status(404).json({ message: "Genre not found" });
        } else {
            res.status(200).json(genre);
        }
    } catch (err) {
        res.status(500).json({ message: "Error retrieving genre", error: err.message });
    }
};

const updateGenre = async (req, res) => {
    //#swagger.tags = ['Genres']
    try {
        const genreId = ObjectId.createFromHexString(req.params.id);
        const updatedGenre = {
            name: req.body.name,
            description: req.body.description
        };

        const response = await mongodb.getDatabase().db().collection('genres').updateOne({ _id: genreId }, { $set: updatedGenre });

        if (response.modifiedCount > 0) {
            res.status(200).json({ message: "Genre updated successfully" });
        } else {
            res.status(404).json({ message: "Genre not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error updating genre", error: err.message });
    }
};

const deleteGenre = async (req, res) => {
    //#swagger.tags = ['Genres']
    try {
        const genreId = ObjectId.createFromHexString(req.params.id);
        const response = await mongodb.getDatabase().db().collection('genres').deleteOne({ _id: genreId });

        if (response.deletedCount > 0) {
            res.status(200).json({ message: "Genre deleted successfully" });
        } else {
            res.status(404).json({ message: "Genre not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error deleting genre", error: err.message });
    }
};

module.exports = {
    addGenre,
    getAllGenres,
    getGenreById,
    updateGenre,
    deleteGenre
};
