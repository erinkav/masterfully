// Load environment variables
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: './env/development.env' });
} else if (process.env.NODE_ENV === 'production') {
  require('dotenv').config({ path: './env/production.env' });
}

var express = require('express');
var util = require('./lib/utility.js');

var app = express();
var flash = require('connect-flash');
app.use(flash()); 
var passport = require('passport');


// API call to Watson Speech to Text
app.use('/api/speech-to-text', require('./config/stt-token.js'));
// app.use('/api/tone-analyzer', require('./config/ta-token.js'));
// Initial Configuration, Static Assets, & View Engine Configuration
require('./config/initialize.js')(app, express);
// Authentication Middleware: Express Sessions, Passport Strategy
require('./config/auth.js')(app, express, passport, flash);

// Pre-Authentication Routes & OAuth Requests
require('./routes/auth-routes.js')(app, passport);

//Authentication check currently commented out, uncomment line to re-activate
app.use(util.ensureAuthenticated);

// View Routes
require('./routes/view-routes.js')(app);
// API Routes
require('./routes/api-routes.js')(app);

// Wildcard route
app.get('/*', function(req, res) {
  res.redirect('/');
})

app.listen(Number(process.env.PORT), process.env.HOST, function() {
  console.log('NODE_ENV: ' + process.env.NODE_ENV);
  console.log(process.env.APP_NAME + ' is listening at ' + process.env.HOST + ' on port ' + process.env.PORT + '.')
});