const express = require('express');
const router = express.Router()
const ejs = require('ejs');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const user = require('./../models/user.js')

const login_error = encodeURIComponent('You Need To Login First.');

const profile_error = encodeURIComponent('Error Code: Profile Fail')

const lb_error = encodeURIComponent('Error Code: LB Fail')


const data_error = encodeURIComponent('Error Code: Data Fail')


router.get('/', async function(req, res) {
  var message = req.query.message;
  try {
    if (!req.user || !req.user.discordId) {
      return res.redirect(`/?message=${login_error}`);
    }

    const exist = await user.findOne({ discordId: req.user.discordId });

    if (!exist) {
      return res.send(`/?message=${data_error}`);
    }

    // Retrieve the data from the found document
    const userData = exist.toObject();

    // Pass the userData to the `home.ejs` template
    res.render(`${__dirname}/../views/home.ejs`, { userData, message });

  } catch (err) {
    console.log(err);
    res.redirect(`/?message=${profile_error}`);
  }
});




router.get('/data', (req, res) => {
  if (req.user) {
    res.send('Data Deletion Is Not Supported Yet Sorry. It Would Be Added Soon. Sorry For The Inconvenience. This Project is Open Source, If You Want It To Speed It Up. Come In With A Pull Request.')
  } else {
    res.rediret(`/?message=${login_error}`)
  }
});


router.get('/leaderboard', async (req, res) => {
  if (!req.user) { res.redirect(`/?message=${login_error}`); };
  try {
    const users = await user.find();
    res.render(`${__dirname}/../views/board.ejs`, { users   })
  } catch (err) {
    console.log(err)
    res.redirect(`/home?message=${lb_error}`)

  }
});



module.exports = router;