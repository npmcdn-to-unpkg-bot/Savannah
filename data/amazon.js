var express = require('express');
var amazon = require('amazon-product-api');

var client = amazon.createClient({
  awsId: process.env.AWS_ID,
  awsSecret: process.env.AWS_SECRET
});

var products = {};
products.apple = new Promise((fulfill, reject) => {
  client.itemSearch({
    brand: 'Apple',
    searchIndex: 'PCHardware'
  }, (err, results, response) => {
    if (err) reject(err);
    fulfill(results);
  });
});

module.exports = products;
