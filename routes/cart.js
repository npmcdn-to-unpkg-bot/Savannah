"use strict";

var express = require('express');
var router = express.Router();
var products = require('../data/amazon');

router.get('/', (req, res, next) => {
  let viewData = {
    title: 'Cart',
    products: products.hardware._result
  };
  res.render('cart', viewData);
});

router.get('/add/:asin', (req, res) => {
  // TODO: Add the product to the
  // users' cart then redirect them
  res.redirect('/cart');
});

module.exports = router;
