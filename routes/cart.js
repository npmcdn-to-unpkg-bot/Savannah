"use strict";

var _ = require('underscore');
var express = require('express');
var router = express.Router();
var products = require('../data/amazon');
var User = require('../models/User');
var prettyjson = require('prettyjson');

// Middleware
router.use((req, res, next) => {
  // Refresh the users' session data
  req.login(req.user, (err) => {
    if (err) throw err;
    next();
  });
});

// Routes
router.get('/', (req, res, next) => {
  let viewData = {title: 'Cart'};
  if (req.user) {
    products.with_many_asins(req.user.cart).then((values) => {
      // Get ready to format some floats to USD
      var usd = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      });

      // Move the product data up a level
      for (var i=0; i<values.length; i++) {
        values[i] = values[i][0];
      }
      viewData.products = values;

      // Figure out the total, subtotal, and tax
      var subtotal = 0.0;
      _.each(viewData.products, (product) => {
        // Convert Amazon's integer format to a
        // float then add it to 'subtotal' >___>
        //
        // 'toFixed()' returns a string which is
        // why there are 'parseFloat()' calls
        //
        subtotal += parseFloat(
          parseFloat(
            (product.ItemAttributes[0].ListPrice[0].Amount / 100).toFixed(2)
          ).toFixed(2)
        );
      });
      viewData.subtotal = usd.format(subtotal);

      // Figure out the tax and total
      //
      // I'm not about to actually write a tax
      // calculator so I'm just going to
      // multiply it by my states' sales tax
      //
      var tax = (subtotal * 0.06).toFixed(2);
      var total = parseFloat(subtotal) + parseFloat(tax);
      viewData.tax = usd.format(parseFloat(tax));
      viewData.total = usd.format(total);

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

router.post('/delete', (req, res) => {
  var updatedCart = req.user.cart;

  // Delete the ASIN of the product they wanted to get rid of
  updatedCart.splice(updatedCart.indexOf(req.body.asin), 1);

  // Remember the removal of that ASIN in the database
  User.update({_id: req.user._id}, {
    $set: {cart: updatedCart}
  }, (err) => {
    if (err) {
      console.error(err.message);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
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
