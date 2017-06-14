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
  res.redirect('CS496FinalProject://login?user=' + JSON.stringify(req.user));
})

router.get('/google', passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/plus.profile.emails.read'
    ],
    accessType: 'offline'
  })
);

router.get('/logout', (req, res, next)=>{
  req.session.destroy();
	req.logout();
  console.log(req.user);
	res.redirect('CS496FinalProject://login');
})

module.exports = router;
