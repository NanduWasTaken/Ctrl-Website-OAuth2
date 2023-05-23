const express = require('express');
const router = express.Router()
const ejs = require('ejs');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const user = require('./../models/user.js')

const login_error = encodeURIComponent('You Need To Login First.');

router.get('/', async function(req, res) {
  try {
    if (!req.user || !req.user.discordId) {
      return res.redirect(`/?message=${login_error}`);
    }

    const exist = await user.findOne({ discordId: req.user.discordId });

    if (!exist) {
      return res.send('An Error Has Occurred. Please Contact the Website Admin');
    }

    // Retrieve the data from the found document
    const userData = exist.toObject();

    // Pass the userData to the `home.ejs` template
    res.render('/home/runner/Discord-Oauth2-Login-With-Passport/public/home.ejs', { userData });

  } catch (err) {
    console.log(err);
    res.send('An Error Has Blocked Your Way. Contact the Website Admin');
  }
});




router.get('/data', (req, res) => {
  if (req.user) {
    res.send('Data Deletion Is Not Supported Yet Sorry. It Would Be Added Soon. Sorry For The Inconvenience. This Project is Open Source, If You Want It To Speed It Up. Come In With A Pull Request.')
  } else {
    res.rediret(`/${encodeURIComponent('You Need To Login First.')}`)
  }
});


router.get('/data', (req, res) => {
  if (req.user) {
    res.sendFile(`/home/runner/Discord-Oauth2-Login-With-Passport/public/home.html`)
  } else {
    res.redirect(`/?message=${login_error}`)
  }
});


router.get('/leaderboard', async (req, res) => {
  if (!req.user) { res.redirect(`/?message=${login_error}`); };
  try {
    const users = await user.find();
    res.render(`/home/runner/Discord-Oauth2-Login-With-Passport/public/board.ejs`, { users })
  } catch (err) {
    console.log(err)
    res.send('error occurred contact Website Admin')

  }
});



module.exports = router;