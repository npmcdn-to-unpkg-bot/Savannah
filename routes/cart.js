"use strict";

var express = require('express');
var router = express.Router();
var products = require('../data/amazon');
var User = require('../models/User');

router.get('/', (req, res, next) => {
  
  let viewData = {
    title: 'Cart',
    products: products.hardware._result
  };
  res.render('cart', viewData);
});

router.get('/add/:asin', (req, res) => {
  if (req.user) {
    // Remember that the user wants to buy this item
    User.findById(req.user._id, (err, user) => {
      if (err) throw err;
      user.cart.push(req.params.asin);
      user.save((err) => {
        if (err) throw err;
        res.redirect('/cart');
      });
    });
  } else {
    // The user isn't logged in
    res.redirect('/auth/login')
  }
});

module.exports = router;
