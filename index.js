const express = require("express"),
  authApp = express(),
  exphbs = require('express-handlebars'),
  session = require('express-session'),
  path = require('path');
  
  
function authFunction(param) {  
  authApp.use(session({
    secret: 'keyboard cat',
  }))
  
  authApp.engine('handlebars', exphbs());
  authApp.set('view engine', 'handlebars');
  authApp.set('views', path.join(__dirname, 'templates'));
  authApp.get('/login', function (req, res) {
    if (req.session.user) {
      res.redirect('/')
    } else {
      res.render(param.loginPage);
    }
  });
  
  authApp.get('/gohome', function (req, res) {
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
  return authApp;
}

module.exports = authFunction;
