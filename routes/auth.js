var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/login', (req, res, next) => {
  res.send('Get /login');
});

router.get('/register', (req, res, next) => {
  res.render('auth/register');
});

router.post('/register', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login'
}));

module.exports = router;
