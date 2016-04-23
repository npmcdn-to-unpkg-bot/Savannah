var express = require('express');
var router = express.Router();
var products = require('../data/amazon')

/* GET home page. */
router.get('/', (req, res, next) => {
  res.json(products.apple);
  // res.render('products', {title: 'Products'});
});

module.exports = router;
