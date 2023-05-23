const express = require('express');
const session = require('express-session');
const router = express.Router();
const MongoStore = require('connect-mongo');
const passport = require('passport');
const cookieParser = require('cookie-parser');

const login_error = encodeURIComponent('Error Occured In Authorisation.');

// This directory will trigger Discord Strategy 
router.get('/discord', passport.authenticate('discord'));

// Callback Directory 
router.get('/discord/callback', passport.authenticate('discord', { failureRedirect: `/?message=${login_error}` }), (req, res) => {
  res.redirect('/home');
  // On success redirect to /home directory
});

router.get('/logout', function(req, res, next) {
  res.clearCookie('connect.sid');
  req.session.destroy();
  res.redirect('/?message=Logged%20Out%20Successfully%21')
});

module.exports = router;