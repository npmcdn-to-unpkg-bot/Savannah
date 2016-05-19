var express = require('express');
var amazon = require('amazon-product-api');

var client = amazon.createClient({
  awsId: process.env.AWS_ID,
  awsSecret: process.env.AWS_SECRET
});

module.exports = {
  electronics: new Promise((fulfill, reject) => {
    client.itemSearch({
      keywords: encodeURIComponent('laptop').replace('%20', '+'),
      searchIndex: 'Electronics',
      responseGroup: 'Large'
    }, (err, results, response) => {
      if (err) reject(err);
      fulfill(results);
    });
  }),
  software: new Promise((fulfill, reject) => {
    client.itemSearch({
      keywords: encodeURIComponent('Adobe').replace('%20', '+'),
      searchIndex: 'Software',
      responseGroup: 'Large'
    }, (err, results, response) => {
      if (err) reject(err);
      fulfill(results);
    });
  }),
  hardware: new Promise((fulfill, reject) => {
    client.itemSearch({
      keywords: encodeURIComponent('tower').replace('%20', '+'),
      searchIndex: 'Electronics',
      responseGroup: 'Large'
    }, (err, results, response) => {
      if (err) reject(err);
      fulfill(results);
    });
  }),
  with_asin: (asin) => {
    return new Promise((fulfill, reject) => {
      client.itemLookup({
        itemId: asin,
        responseGroup: 'Large'
      }, (err, results, response) => {
        if (err) reject(err);
        fulfill(results);
      });
    })
  },
  with_many_asins: () => {
    matchingProducts = [];
    for (var i=0; i<arguments.length; i++) {
      matchingProducts.push(new Promise((fulfill, reject) => {
        client.itemLookup({
          itemId: arguments[i],
          responseGroup: 'Large'
        }, (err, results, response) => {
          if (err) reject(err);
          fulfill(results);
        });
      }));
    }
    return matchingProducts;
  }
};
