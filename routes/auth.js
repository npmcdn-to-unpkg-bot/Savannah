var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/login', (req, res, next) => {
  res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login'
}));

router.get('/register', (req, res, next) => {
  res.render('auth/register');
});

router.post('/register', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login'
}));

router.get('/logout', (req, res, next) => {
  if (req.user) {
    console.log('"' + req.user.name + '" logged out.');
    req.logout();
    req.session.destroy();
  }
  res.redirect('/');
});

module.exports = router;
