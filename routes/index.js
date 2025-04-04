const passport = require('passport');
const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/users', require('./users'));

const moviesRoutes = require('./movies');
const actorsRoutes = require('./actors');
const genresRoutes = require('./genres');
const reviewsRoutes = require('./reviews');

router.use('/movies', moviesRoutes);
router.use('/actors', actorsRoutes);
router.use('/genres', genresRoutes);
router.use('/reviews', reviewsRoutes);

router.get('/login', passport.authenticate('github'), (req, res) => {
  //#swagger.tags = ['Authentication']
  //#swagger.summary = 'Redirect to GitHub Authentication'
  //#swagger.description = 'Click <a href="/login">here</a> to authenticate with GitHub.'
});

router.get('/logout', function(req, res, next) {
  //#swagger.tags = ['Authentication']
  //#swagger.summary = 'Logout User'
  //#swagger.description = 'Click <a href="/logout">here</a> to log out and return to the homepage.'

  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;