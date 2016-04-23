var express = require('express');
var amazon = require('amazon-product-api');

var client = amazon.createClient({
  awsId: process.env.AWS_ID,
  awsSecret: process.env.AWS_SECRET
});

var products = {};
products.hardware = new Promise((fulfill, reject) => {
  client.itemSearch({
    keywords: encodeURIComponent('hard drive').replace('%20', '+'),
    searchIndex: 'Electronics',
    responseGroup: 'Large'
  }, (err, results, response) => {
    if (err) reject(err);
    fulfill(results);
  });
}).then();

module.exports = products;
