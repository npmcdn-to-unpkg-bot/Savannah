"use strict";

var express = require('express');
var router = express.Router();
var products = require('../data/amazon');
var Product = require('../models/Product');

// Middleware
router.use('/products/:asin', (req, res, next) => {
  // Create and get the product from the database
  Product.findOrCreate({asin: req.params.asin}, (err, products, wasCreated) => {
    if (err) throw err;
    res.locals.product = products;
    next();
  });
});

// Routes
router.get('/', (req, res, next) => {
  products.hardware.then((hardware) => {
    let viewData = {
      title: 'Products',
      products: hardware
    };
    res.render('products', viewData);
  });
});

router.get('/electronics', (req, res, next) => {
  products.electronics.then((electronics) => {
    var viewData = {
      title: "Electronics",
      products: electronics
    };
    res.render('products', viewData);
  });
});

router.get('/software', (req, res, next) => {
  products.software.then((software) => {
    let viewData = {
      title: "Software",
      products: software
    };
    res.render('products', viewData);
  });
});

router.get('/hardware', (req, res, next) => {
  products.hardware.then((hardware) => {
    let viewData = {
      title: "Hardware",
      products: hardware
    };
    res.render('products', viewData);
  });
});

router.get('/products/:asin', (req, res, next) => {
  products.with_asin(req.params.asin).then((result) => {
    let viewData = {
      title: result[0].ItemAttributes[0].Brand + " " + result[0].ItemAttributes[0].Model,
      productAsin: result[0].ASIN[0],
      productInfo: result[0].ItemAttributes[0],
      productImages: result[0].ImageSets[0].ImageSet,
      productListPrice: result[0].Offers[0].Offer[0].OfferListing[0].Price[0].FormattedPrice
    };
    res.render('product-detail', viewData);
  });
});

router.post('/products/review', (req, res, next) => {
  // Save the review of the product
  Product.update({asin: req.body.asin}, {
    $push: {
      reviews: {
        stars: req.body.star_count,
        body: req.body.review_body,
        author: {
          name: (req.user) ? req.user.full_name : req.body.full_name,
          photo: (req.user) ? req.user.photo : '',
          location: (req.user) ? req.user.location : req.body.location
        }
      }
    }
  }, {upsert: true}, (err, product) => {
    if (err) throw err;
    res.redirect(req.header('Referer') || '/');
  });
});

module.exports = router;
