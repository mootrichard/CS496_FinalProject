const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const auth = require('./auth');
const User = require('../models/users');

module.exports = (passport) => {
  passport.serializeUser((user, done)=>{
    done(null, user._id);
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
      User.findOne({'googleId': profile.id}, (err, user)=>{
        if(err) return done(err);
        if(user){
          return done(null, user);
        } else {
          const newUser = new User();

          newUser.googleId = profile.id;
          newUser.token = token;
          newUser.refreshToken = refreshToken;
          newUser.name = profile.displayName;
          newUser.email = profile.emails[0].value;

          newUser.save((err)=>{
            if(err) throw err;
            return done(null, newUser);
          });
        }
      })
    })
  }))
}
