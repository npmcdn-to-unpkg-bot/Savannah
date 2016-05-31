var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate')

var productSchema = new mongoose.Schema({
  id: String,
  idHash: String,
  asin: String,
  reviews: [{
    stars: Number,
    body: String,
    createdAt: {
      type: Date,
      default: Date.now
    },
    author: {
      name: String,
      photo: String,
      location: String
    },
    comments: [{
      author: {
        name: String,
        photo: String,
        location: String,
        createdAt: {
          type: Date,
          default: Date.now
        }
      },
      body: String,
      createdAt: {
        type: Date,
        default: Date.now
      }
    }]
  }]
}, {
  collection : 'Products'
});

productSchema.plugin(findOrCreate);

var Product = mongoose.model('Product', productSchema);

module.exports = Product;
