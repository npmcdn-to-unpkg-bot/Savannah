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
  passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({
      name: username
    }, (err, existingUser) => {
      if (err) throw err;
      if (!existingUser) {
        console.log('Found the user');
        // There's no user with the username
        // provided so we'll create one
        var additionalUser = new User({
          name: "Alexander",
          password: "thisisthesupersecretpassword"
        });
        additionalUser.save((err) => {
          if (err) throw err;
          console.log('User should have saved.');
        });
        return done(null, additionalUser);
      }

      if (!existingUser.validPassword(password)) {
        // An incorrect password was provided
        console.log('Wrong password.');
        return done(null, false, {
          message: "Wrong password."
        });
     }

     console.log('done.');
     // The user was authenticated so
     // we'll return it to Passport
     return done(null, existingUser);
    });
  }));
};
