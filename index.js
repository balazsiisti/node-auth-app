const express = require("express"),
  authApp = express(),
  exphbs = require('express-handlebars'),
  session = require('express-session');

authApp.use(session({
  secret: 'keyboard cat',
}))

authApp.engine('handlebars', exphbs());
authApp.set('view engine', 'handlebars');

authApp.get('/login', function (req, res) {
  if (req.session.user) {
    res.redirect('/')
  } else {
    res.render('home');
  }
});

authApp.get('/gohome', function (req, res) {
  console.log('%%%%%%%%%%%%%%%%%', req.query);
  req.session.user = req.query.fname;
  res.redirect('/');
});

authApp.get('/', (req, res, next) => {
  console.log(req.test);
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login')
  }
});

module.exports = authApp;
