"use strict";

var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  let viewData = {
    title: 'Seminars',
    seminars: [{
      id: 0,
      title: "Getting to Know Ruby on Rails",
      description: "Get to know other Rubyists this weekend at a hackathon in our Manhattan development facilities. Whether you’re a n00b or a professional Ruby developer, we’d love to meet you!",
      headerImageFilename: "red_trains.jpg"
    }],
    filters: [
      'Upcoming',
      'Android',
      'AngularJS',
      'Backbone',
      'Back-End',
      'CoffeeScript',
      'Django',
      'Docker',
      'EmberJS',
      'ExpressJS',
      'Far Cry',
      'Final Fantasy',
      'Firewatch',
      'Front-End',
      'Git',
      'Grand Theft Auto',
      'Heroku',
      'iOS Development',
      'Laravel',
      'Less',
      'Linux',
      'Minecraft',
      'Node',
      'OS X Development',
      'React',
      'React Native',
      'Ruby on Rails',
      'Task Runners',
      'tvOS Development',
      'Ubuntu Server',
      'Sass',
      'watchOS Development',
      'WordPress',
      'WSGI'
    ]
  };
  res.render('seminars', viewData);
});

module.exports = router;
