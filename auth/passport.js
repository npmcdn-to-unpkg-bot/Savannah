var mongoose = require('mongoose');
var User = mongoose.model('User');
var LocalStrategy = require('passport-local').Strategy;

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
      if (err) throw err;

      if (req.path == "/register" && !existingUser) {
        // There's no user with the username
        // provided so we'll create one
        var additionalUser = new User({
          name: username,
          password: password,
          full_name: req.body.full_name,
          email_address: req.body.email_address,
          location: req.body.location
        });
        additionalUser.save((err) => {
          if (err) throw err;
          console.log('"' + additionalUser.name + '" was created and added to the database.');
        });
        return done(null, additionalUser);
      }

      if (req.path == "/login" && !existingUser) {
        // Tell them they haven't registered yet
        return done(null, false, {message: "There's no user with that username."});
      }

      if (existingUser && existingUser.validPassword(password) != true) {
        // An incorrect password was provided
        console.log('"' + existingUser.name + '" provided an incorrect password.');
        return done(null, false, {message: "Wrong password."});
     }

     if (existingUser && existingUser.validPassword(password)) {
       console.log('Successfully authenticated "' +  existingUser.name + '".');
       // The user was authenticated so
       // we'll return it to Passport
       return done(null, existingUser);
     }
    });
  }));
};
