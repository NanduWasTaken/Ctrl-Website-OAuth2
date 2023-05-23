const passport = require('passport');
const crypto = require('crypto');
const cache = {};
const DiscordStrategy = require('passport-discord').Strategy;
const scopes = ['identify', 'email', 'guilds'];  // change this as per your requirement!
const User = require('./../models/user');
const codeVerifier = crypto.randomBytes(32).toString('base64').replace(/[^a-zA-Z0-9]/g, '').substr(0, 128);
const codeChallenge = crypto.createHash('sha256').update(codeVerifier).digest('base64').replace(/[^a-zA-Z0-9]/g, '');
const colour = require('colour')



passport.use(new DiscordStrategy({
  clientID: process.env.clientId,
  clientSecret: process.env.secret,
  callbackURL: process.env.callbackUrl,
  scope: scopes,
  pkce: true,
  state: true,
  authorizationParams: {
    code_challenge: codeChallenge,
    code_challenge_method: 'S256'
  }
},
  async function(accessToken, refreshToken, profile, cb) {
    try {
      // console.log(profile)
      // Find or create the user in your database
      let user = await User.findOneAndUpdate(
        { discordId: profile.id },
        {
          discordId: profile.id,
          username: profile.username,
          global_name: profile.global_name,
          discriminator: profile.discriminator,
          email: profile.email,
          guilds: profile.guilds,
          avatar: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}`,
          accessToken: accessToken,
          refreshToken: refreshToken
        },
        { upsert: true, new: true }
      );

      // Pass the user object to the done() function
      return cb(null, user);
    } catch (err) {
      console.error('Error in DiscordStrategy callback:', err);
      return cb(err);
    }

  }));

// Serializing 
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserializing 
passport.deserializeUser((id, done) => {
  if (cache[id]) { // Check if user is already in cache
    done(null, cache[id]);
  } else { // User not in cache, deserialize from database
    User.findById(id)
      .then(user => {
        if (!user) {
          qww
          return done(null, false);
        }
        cache[id] = user; // Add user to cache
        done(null, user);
      })
      .catch(err => {
        console.error('Error in deserializing user:', err);
        done(err);
      });
  }
});



