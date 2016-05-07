var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Savannah');

var seminarSchema = new mongoose.Schema({
  id: String,
  idHash: String,
  title: String,
  description: String,
  headerImageFilename: String,
  reviews: [{
    stars: Number,
    body: String,
    author: {
      name: String,
      imageFilename: String,
      location: String,
      createdAt: Date
    },
    comments: [{
      author: {
        name: String,
        imageFilename: String,
        location: String,
        createdAt: Date
      },
      body: String,
      createdAt: Date
    }]
  }]
});

var Seminar = mongoose.model('Seminar', seminarSchema);

console.log(Seminar.find({}));
