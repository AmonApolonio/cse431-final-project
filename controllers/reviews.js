const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const addReview = async (req, res) => {
    //#swagger.tags = ['Reviews']
    try {
        const review = {
            movieId: ObjectId.createFromHexString(req.body.movieId),
            userId: ObjectId.createFromHexString(req.body.userId),
            rating: req.body.rating,
            comment: req.body.comment,
            createdAt: new Date()
        };

        const response = await mongodb.getDatabase().db().collection('reviews').insertOne(review);

        if (response.acknowledged) {
            res.status(201).json({ message: "Review added successfully", reviewId: response.insertedId });
        } else {
            res.status(500).json({ message: "Failed to add review" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error adding review", error: err.message });
    }
};

const getReviewsByMovie = async (req, res) => {
    //#swagger.tags = ['Reviews']
    try {
        const movieId = ObjectId.createFromHexString(req.params.movieId);
        const reviews = await mongodb.getDatabase().db().collection('reviews').find({ movieId }).toArray();
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving reviews", error: err.message });
    }
};

const updateReview = async (req, res) => {
    //#swagger.tags = ['Reviews']
    try {
        const reviewId = ObjectId.createFromHexString(req.params.id);
        const updatedReview = {
            rating: req.body.rating,
            comment: req.body.comment,
            updatedAt: new Date()
        };

        const response = await mongodb.getDatabase().db().collection('reviews').updateOne({ _id: reviewId }, { $set: updatedReview });

        if (response.modifiedCount > 0) {
            res.status(200).json({ message: "Review updated successfully" });
        } else {
            res.status(404).json({ message: "Review not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error updating review", error: err.message });
    }
};

const deleteReview = async (req, res) => {
    //#swagger.tags = ['Reviews']
    try {
        const reviewId = ObjectId.createFromHexString(req.params.id);
        const response = await mongodb.getDatabase().db().collection('reviews').deleteOne({ _id: reviewId });

        if (response.deletedCount > 0) {
            res.status(200).json({ message: "Review deleted successfully" });
        } else {
            res.status(404).json({ message: "Review not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error deleting review", error: err.message });
    }
};

module.exports = {
    addReview,
    getReviewsByMovie,
    updateReview,
    deleteReview
};
