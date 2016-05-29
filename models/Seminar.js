var mongoose = require('mongoose');

var seminarSchema = new mongoose.Schema({
  id: String,
  idHash: String,
  title: String,
  description: String,
  headerImageFilename: String,
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
        createdAt: Date
      },
      body: String,
      createdAt: {
        type: Date,
        default: Date.now
      }
    }]
  }]
}, {
  collection : 'Seminars'
});

var Seminar = mongoose.model('Seminar', seminarSchema);

module.exports = Seminar;
