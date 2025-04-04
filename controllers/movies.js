const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags = ['Movies']
    try {
        const movies = await mongodb.getDatabase().db().collection('movies').find().toArray();
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving movies", error: err.message });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags = ['Movies']
    try {
        const movieId = ObjectId.createFromHexString(req.params.id);
        const result = await mongodb.getDatabase().db().collection('movies').findOne({ _id: movieId });

        if (!result) {
            return res.status(404).json({ message: "Movie not found" });
        }

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving movie", error: err.message });
    }
};

const createMovie = async (req, res) => {
    //#swagger.tags = ['Movies']
    try {
        const movie = {
            title: req.body.title,
            director: req.body.director,
            releaseYear: req.body.releaseYear,
            genres: req.body.genres || [], // Array of genre IDs
            rating: req.body.rating || null,
            actors: req.body.actors || [], // Array of actor IDs
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const response = await mongodb.getDatabase().db().collection('movies').insertOne(movie);

        if (response.acknowledged) {
            res.status(201).json({ message: "Movie created successfully", movieId: response.insertedId });
        } else {
            res.status(500).json({ message: "Failed to create movie" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error creating movie", error: err.message });
    }
};

const updateMovie = async (req, res) => {
    //#swagger.tags = ['Movies']
    try {
        const movieId = ObjectId.createFromHexString(req.params.id);

        const existingMovie = await mongodb.getDatabase().db().collection('movies').findOne({ _id: movieId });
        if (!existingMovie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        const movie = {
            title: req.body.title || existingMovie.title,
            director: req.body.director || existingMovie.director,
            releaseYear: req.body.releaseYear || existingMovie.releaseYear,
            genres: req.body.genres || existingMovie.genres, // Array of genre IDs
            rating: req.body.rating !== undefined ? req.body.rating : existingMovie.rating,
            actors: req.body.actors || existingMovie.actors, // Array of actor IDs
            createdAt: existingMovie.createdAt, // Preserve original creation date
            updatedAt: new Date()
        };

        const response = await mongodb.getDatabase().db().collection('movies').replaceOne({ _id: movieId }, movie);

        if (response.modifiedCount > 0) {
            res.status(200).json({ message: "Movie updated successfully" });
        } else {
            res.status(200).json({ message: "No changes made to movie" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error updating movie", error: err.message });
    }
};

const deleteMovie = async (req, res) => {
    //#swagger.tags = ['Movies']
    try {
        const movieId = ObjectId.createFromHexString(req.params.id);

        const response = await mongodb.getDatabase().db().collection('movies').deleteOne({ _id: movieId });

        if (response.deletedCount > 0) {
            res.status(200).json({ message: "Movie deleted successfully" });
        } else {
            res.status(404).json({ message: "Movie not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error deleting movie", error: err.message });
    }
};

const searchMovies = async (req, res) => {
    //#swagger.tags = ['Movies']
    try {
        const title = req.query.title;
        const movies = await mongodb.getDatabase().db().collection('movies').find({ title: { $regex: title, $options: 'i' } }).toArray();
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json({ message: "Error searching movies", error: err.message });
    }
};

const filterMoviesByGenre = async (req, res) => {
    //#swagger.tags = ['Movies']
    try {
        const genre = req.query.genre;
        const movies = await mongodb.getDatabase().db().collection('movies').find({ genres: genre }).toArray();
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json({ message: "Error filtering movies", error: err.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createMovie,
    updateMovie,
    deleteMovie,
    searchMovies,
    filterMoviesByGenre,
};
