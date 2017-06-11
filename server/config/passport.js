const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const auth = require('./auth');
const User = require('../models/users');

module.exports = (passport) => {
  passport.serializeUser((user, done)=>{
    done(null, user.id);
  });

  passport.deserializeUser((id, done)=>{
    User.findById(id, (err, user)=>{
      done(err, user);
    })
  });

  passport.use(new GoogleStrategy({
    clientID        : auth.googleAuth.clientID,
    clientSecret    : auth.googleAuth.clientSecret,
    callbackURL     : auth.googleAuth.callbackURL
  }, (token, refreshToken, profile, done)=>{
    process.nextTick(()=>{
      return done(null, profile);
    })
  }))
}
