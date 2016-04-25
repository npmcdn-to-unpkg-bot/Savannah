"use strict";

var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  let viewData = {
    title: 'Seminars',
    seminars: [{
      title: "Getting to Know Ruby on Rails",
      description: "Get to know other Rubyists this weekend at a hackathon in our Manhattan development facilities. Whether you’re a n00b or a professional Ruby developer, we’d love to meet you!",
      header_image_filename: "red_trains.jpg"
    }]
  };
  res.send('seminars', viewData);
});

module.exports = router;
