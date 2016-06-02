"use strict";

var express = require('express');
var router = express.Router();
var products = require('../data/amazon');
var User = require('../models/User');

router.get('/', (req, res, next) => {
  let viewData = {title: 'Cart'};
  if (req.user) {
    products.with_many_asins(req.user.cart).then((values) => {
      // Move the product data up a level
      for (var i=0; i<values.length; i++) {
        values[i] = values[i][0];
      }
      viewData.products = values;
      res.render('cart', viewData);
    });
  } else {
    // Show a few random hardware products
    products.hardware.then((products) => {
      // Only show the first five
      viewData.products = products.slice(0, 5);
      res.render('cart', viewData);
    });
  }
});

router.get('/add/:asin', (req, res) => {
  if (req.user) {
    // Remember that the user wants to buy this item
    req.user.cart = (req.user.cart.length) ? req.user.cart : [];
    req.user.cart.push(req.params.asin);
    User.findByIdAndUpdate(req.user._id, {$set: {
      cart: req.user.cart
    }}, (err, user) => {
      
      res.redirect('/cart');
    });
  } else {
    // The user isn't logged in
    res.redirect('/auth/login');
  }
});

module.exports = router;
