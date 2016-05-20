var express = require('express');
var passport = require('passport');
var flash = require('connect-flash');
var router = express.Router();

router.get('/login', (req, res, next) => {
  res.render('auth/login', {
    title: 'Login',
    message: req.flash('error')
  });
});

router.post('/login', passport.authenticate('local', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/auth/login',
  failureFlash: true
}));

router.get('/register', (req, res, next) => {
  res.render('auth/register', {
    title: 'Sign up'
  });
});

router.post('/register', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  failureFlash: true
}));

router.get('/logout', (req, res, next) => {
  if (req.user) {
    console.log('"' + req.user.name + '" logged out.');
    req.logout();
  }
  res.redirect('/');
});

module.exports = router;
