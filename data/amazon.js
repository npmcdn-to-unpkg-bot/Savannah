var express = require('express');
var amazon = require('amazon-product-api');

var client = amazon.createClient({
  awsId: process.env.AWS_ID,
  awsSecret: process.env.AWS_SECRET
});

module.exports = {
  hardware: new Promise((fulfill, reject) => {
    client.itemSearch({
      keywords: encodeURIComponent('hard drive').replace('%20', '+'),
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
        itemId: asin
      }, (err, results, response) => {
        if (err) reject(err);
        fulfill(results);
      });
    })
  }
};
