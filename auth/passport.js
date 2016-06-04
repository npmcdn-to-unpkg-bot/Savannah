var mongoose = require('mongoose');
var User = mongoose.model('User');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var prettyjson = require('prettyjson');

module.exports = (passport) => {
  // Serialize the user for session storage
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // Deserialize the user in the session
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  // Local strategy configuration
  passport.use(new LocalStrategy({
    passReqToCallback: true
  }, (req, username, password, done) => {
    User.findOne({
      name: req.body.username
    }, (err, existingUser) => {
      if (req.path == "/register" && !existingUser) {
        // There's no user with the username
        // provided so we'll create one by
        // first hashing their password
        bcrypt.hash(password, 12, (err, hashedPassword) => {
          if (err) throw err;

          // Create the user
          var additionalUser = new User({
            name: username,
            password: hashedPassword,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            full_name: req.body.first_name + " " + req.body.last_name,
            email_address: req.body.email_address,
            location: req.body.location
          });
          additionalUser.save((err) => {
            if (err) throw err;
            console.info('"' + additionalUser.name + '" was created and added to the database.');
          });
          return done(null, additionalUser);
        });
      }

      if (req.path == "/login" && !existingUser) {
        // Tell them they haven't registered yet
        return done(null, false, {message: "There's no user with that username."});
      }

      if (existingUser) {
        bcrypt.compare(password, existingUser.password, (err, matches) => {
          if (matches) {
            console.info('Successfully authenticated "' +  existingUser.name + '".');
            // The user was authenticated so
            // we'll return it to Passport
            return done(null, existingUser);
          } else {
            // An incorrect password was provided
            console.info('"' + existingUser.name + '" provided an incorrect password.');
            return done(null, false, {message: "Wrong password."});
          }
        });
     }

     if (existingUser && existingUser.validPassword(password)) {
     }
    });
  }));
};
