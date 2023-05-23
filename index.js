// importing modules 

const express = require("express");
const colour = require("colour");
const passport = require("passport");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');

const db = require('./db.js');
const auth1 = require("./routes/auth.js");
const home21 = require("./routes/home.js");

const app = express();
const sessionStore = new MongoStore({ mongoUrl: process.env.URI_DB });


// Session Handling
app.use(session({
  secret: 'walnuttagbbnahggavhehacker',
  resave: false,
  saveUninitialized: false,
  store: sessionStore
}));


// Session and Initialize
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));
app.use(cookieParser());

app.set('view engine', 'ejs');

// Router
app.use("/home", home21);
app.use("/api", auth1);


app.get('/', function(req, res) {
  var message = req.query.message;
  if (!req.user) {
    res.render('/home/runner/Discord-Oauth2-Login-With-Passport/public/index.ejs', { message: message, login: false });
  } else {
    res.render('/home/runner/Discord-Oauth2-Login-With-Passport/public/index.ejs', { message: message, login: true });
  }    
});


app.use((req, res, next) => {
  res.status(404).sendFile('/home/runner/Discord-Oauth2-Login-With-Passport/public/404.html');
});

// Discord Strategy
require("./strategy/discord");










// Listen
app.listen(2000, () => {
  console.log(`Website Is Running!`.green);
});
