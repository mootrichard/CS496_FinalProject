const router = require('express').Router();
const passport = require('passport');
require('../config/passport')(passport);

router.get('/', (req,res,next)=>{
	res.json({
    method: req.method,
    headers: req.headers,
    originalUrl: req.originalUrl,
    params: req.params,
    body: req.body
  });
});

router.get('/google/callback', passport.authenticate('google'), (req, res, next) => {
  res.json({
    success: 'successful oAuth with Google',
    params: req.params,
    body: req.body,
    user: req.user
  })
})

router.get('/google', passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/plus.profile.emails.read'
    ]
  })
);

module.exports = router;
