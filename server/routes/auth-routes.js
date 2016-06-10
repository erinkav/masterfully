var UserController = require('./../controllers/UserController.js');
var flash = require('connect-flash'); 

module.exports = function(app, passport) {

  // Pre-authentication routes
  app.get('/welcome',
  function(req, res) {
    res.render('welcome');
  });

  app.get('/login',
  function(req, res) {
    console.log(flash('error')); 
    res.render('login');
  });

  app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: 'true'
  }));

  app.get('/signup',
  function(req, res) {
    res.render('signup');
  });

  app.post('/api/users', UserController.createUser);

  app.get('/logout',
  function(req, res) {
    req.logout();
    res.redirect('/')
  });

};