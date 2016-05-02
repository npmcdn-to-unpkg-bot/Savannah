"use strict";

var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  let viewData = {
    title: 'Seminars',
    seminars: [{
      id: 0,
      idHash: 'ESHzx1Fo5Nv3Lz1Bz6Qqe2fE5xKpzosCoMd7qY57LUS28VmV2O',
      title: "Getting to Know Ruby on Rails",
      description: "Get to know other Rubyists this weekend at a hackathon in our Manhattan development facilities. Whether you’re a n00b or a professional Ruby developer, we’d love to meet you!",
      headerImageFilename: "red-trains.jpg"
    }, {
      id: 2,
      idHash: '3z5Ial0E5FvN38P03sh6s4TVtmLIkoHvw7Fcbqww1hjjWlhdrw',
      title: "What’s new in Laravel 5.2?",
      description: "Authentication scaffolding, implicit model binding, rate limiting, array validation, and more! We’ll be talking about all the differences between Laravel 5.1 and 5.2 this week!",
      headerImageFilename: "laravel-5.jpg"
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

router.get('/:id', (req, res, next) => {
  let viewData = {
    seminar: {
      id: 2,
      idHash: '3z5Ial0E5FvN38P03sh6s4TVtmLIkoHvw7Fcbqww1hjjWlhdrw',
      title: "What’s new in Laravel 5.2?",
      description: "Authentication scaffolding, implicit model binding, rate limiting, array validation, and more! We’ll be talking about all the differences between Laravel 5.1 and 5.2 this week!",
      headerImageFilename: "laravel-5.jpg",
      reviews: [{
        stars: 4,
        body: "This seminar was incredible. Not only did we talk about the differences between the versions, but I learned quite a few new things about Laravel that I hadn’t known before! They also mentioned a few tricks you can do with PHP that I hadn’t known about.",
        author: {
          name: 'Otis Bryant',
          imageFilename: 'otis_bryant.jpg',
          location: 'Minneapolis, MN',
          createdAt: "Monday, 11 April 2016"
        },
        comments: [{
          author: {
            name: "Alicia Choi",
            location: "Seattle, WA",
            imageFilename: "alicia_choi.jpg"
          },
          body: "I learned some new stuff, too! I also highly recommend this seminar. I've learned so many things and I'm ready to use this software to its\' greater potential. 10 out of 10. I highly recommend it!",
          createdAt: "Tuesday, 12 April 2016"
        }]
      }],
    }
  };
  res.render('seminar-detail', viewData);
});

module.exports = router;
