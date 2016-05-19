var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var products = require('./routes/products');
var cart = require('./routes/cart');
var seminars = require('./routes/seminars');
var auth = require('./routes/auth');

var mongoose = require('mongoose');
var passport = require('passport');

// Import User model and Passport configuration
require('./models/User');
require('./auth/passport')(passport);

// Connect Mongoose to Mongo
mongoose.connect('mongodb://localhost/Savannah', (err, res) => {if (err) throw err;});

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Use sessions so Passport can
// put the user object in 'req'
app.use(session({
  secret: 'RzZDIPHHGtFwN7gzQcW7C1nMIJB7TL',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Make authenticated user data available everywhere
// and prepare some other variables for later use
app.use((req, res, next) => {
  // Passport user object things
  if (req.user) {
    app.locals.user = req.user;
  }

  // Other stuff
  app.locals.currentUrlPath = req.path;
  next();
});

app.use('/', products);
app.use('/cart', cart);
app.use('/seminars', seminars);
app.use('/auth', auth);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
