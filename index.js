const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
require('dotenv').config()
const mongoose = require('mongoose')
require('./auth-module/passport')
const route = require('./auth-module/routs')
require('./auth-module/db-config')

app.set('view engine', 'ejs');

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));

mongoose.connect("mongodb://localhost/Google-Auth")

app.use(passport.initialize());
app.use(passport.session());



app.use('/',route);



const port = process.env.PORT || 3000;
app.listen(port , () => console.log('App listening on port ' + port));