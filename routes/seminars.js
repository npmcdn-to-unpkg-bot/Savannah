"use strict";

var express = require('express');
var router = express.Router();
var Seminar = require('../data/seminars');

router.get('/:id', (req, res, next) => {
  let viewData = {
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
  Seminar.find({idHash: req.params.id}, (err, seminar) => {
    console.log(JSON.stringify(seminar));
    viewData.seminar = seminar[0];
    res.render('seminar-detail', viewData);
  })
});

router.get('/', (req, res, next) => {
  let viewData = {
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
  Seminar.find({}, (err, seminars) => {
    viewData.seminars = seminars;
    res.render('seminars', viewData);
  })
});

module.exports = router;
