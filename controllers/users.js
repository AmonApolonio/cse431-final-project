const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags = ['Users']
    try {
        const users = await mongodb.getDatabase().db().collection('users').find().toArray();
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving users", error: err.message });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags = ['Users']
    try {
        const userId = ObjectId.createFromHexString(req.params.id);
        const result = await mongodb.getDatabase().db().collection('users').findOne({ _id: userId });

        if (!result) {
            return res.status(404).json({ message: "User not found" });
        }

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving user", error: err.message });
    }
};

const createUser = async (req, res) => {
    //#swagger.tags = ['Users']
    try {
        const user = {
            username: req.body.username,
            email: req.body.email,
            favorites: req.body.favorites || [], // Array of movie IDs
            birthday: req.body.birthday || null,
            isActive: req.body.isActive !== undefined ? req.body.isActive : true,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const response = await mongodb.getDatabase().db().collection('users').insertOne(user);

        if (response.acknowledged) {
            res.status(201).json({ message: "User created successfully", userId: response.insertedId });
        } else {
            res.status(500).json({ message: "Failed to create user" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error creating user", error: err.message });
    }
};

const updateUser = async (req, res) => {
    //#swagger.tags = ['Users']
    try {
        const userId = ObjectId.createFromHexString(req.params.id);

        const existingUser = await mongodb.getDatabase().db().collection('users').findOne({ _id: userId });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = {
            username: req.body.username || existingUser.username,
            email: req.body.email || existingUser.email,
            favorites: req.body.favorites || existingUser.favorites, // Array of movie IDs
            birthday: req.body.birthday || existingUser.birthday,
            isActive: req.body.isActive !== undefined ? req.body.isActive : existingUser.isActive,
            createdAt: existingUser.createdAt, // Preserve original creation date
            updatedAt: new Date()
        };

        const response = await mongodb.getDatabase().db().collection('users').replaceOne({ _id: userId }, user);

        if (response.modifiedCount > 0) {
            res.status(200).json({ message: "User updated successfully" });
        } else {
            res.status(200).json({ message: "No changes made to user" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error updating user", error: err.message });
    }
};

const deleteUser = async (req, res) => {
    //#swagger.tags = ['Users']
    try {
        const userId = ObjectId.createFromHexString(req.params.id);

        const response = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: userId });

        if (response.deletedCount > 0) {
            res.status(200).json({ message: "User deleted successfully" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error deleting user", error: err.message });
    }
};

const addFavoriteMovie = async (req, res) => {
    //#swagger.tags = ['Users']
    try {
        const userId = ObjectId.createFromHexString(req.user.id);
        const movieId = req.params.movieId;

        const response = await mongodb.getDatabase().db().collection('users').updateOne(
            { _id: userId },
            { $addToSet: { favorites: movieId } }
        );

        if (response.modifiedCount > 0) {
            res.status(200).json({ message: "Movie added to favorites" });
        } else {
            res.status(404).json({ message: "User not found or movie already in favorites" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error adding movie to favorites", error: err.message });
    }
};

const removeFavoriteMovie = async (req, res) => {
    //#swagger.tags = ['Users']
    try {
        const userId = ObjectId.createFromHexString(req.user.id);
        const movieId = req.params.movieId;

        const response = await mongodb.getDatabase().db().collection('users').updateOne(
            { _id: userId },
            { $pull: { favorites: movieId } }
        );

        if (response.modifiedCount > 0) {
            res.status(200).json({ message: "Movie removed from favorites" });
        } else {
            res.status(404).json({ message: "User not found or movie not in favorites" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error removing movie from favorites", error: err.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser,
    addFavoriteMovie,
    removeFavoriteMovie,
};