"use strict";

var express = require('express');
var router = express.Router();
var products = require('../data/amazon')

/* GET home page. */
router.get('/', (req, res, next) => {
  var viewData = {
    title: 'Products',
    products: products.hardware._result
  };
  res.render('products', viewData);
  // res.json(products.hardware);
});

module.exports = router;
