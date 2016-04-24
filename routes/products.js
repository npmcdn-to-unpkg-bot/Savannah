"use strict";

var express = require('express');
var router = express.Router();
var products = require('../data/amazon')

router.get('/', (req, res, next) => {
  let viewData = {
    title: 'Products',
    products: products.hardware._result
  };
  res.render('products', viewData);
});

router.get('/products/:asin', (req, res, next) => {
  let viewData = {title: 'Product Details'};
  products.with_asin(req.params.asin).then((result) => {
    viewData.product = result;
    // res.render('product-detail', viewData);
    res.json(result);
  });
});

module.exports = router;
