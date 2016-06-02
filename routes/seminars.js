"use strict";

var express = require('express');
var router = express.Router();
var Seminar = require('../models/Seminar');

// Middleware
router.use((req, res, next) => {
  // Choose the seminar detail to show in the CTA
  Seminar.find({idHash: 'hUmmmGJ7clRMosbgmWVcI55K78rK1NTs2cvGHMaLGKmeUEEAgX'}, (err, seminars) => {
    res.locals.seminar_cta = seminars[0];
    next();
  });
});

// Routes
router.get('/:id', (req, res, next) => {
  Seminar.find({idHash: req.params.id}, (err, seminar) => {
    let viewData = {
      seminar: seminar[0],
      title: seminar.title,
    };
    res.render('seminar-detail', viewData);
  });
});

router.get('/', (req, res, next) => {
  let viewData = {
    title: "Seminars",
  };
  Seminar.find({}, (err, seminars) => {
    viewData.seminars = seminars;
    res.render('seminars', viewData);
  })
});

router.post('/review', (req, res, next) => {
  // Save the review of the seminar
  Seminar.update({idHash: req.body.id_hash}, {
    $push: {
      reviews: {
        stars: req.body.star_count,
        body: req.body.review_body,
        author: {
          name: (req.user) ? req.user.full_name : req.body.full_name,
          photo: (req.user) ? req.user.photo : '',
          location: (req.user) ? req.user.location : req.body.location
        }
      }
    }
  }, (err) => {});
  res.redirect('/seminars/' + req.body.id_hash);
});

module.exports = router;
