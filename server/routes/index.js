const router = require('express').Router();
const auth = require('./auth');
const users = require('./users');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.use('/auth', auth);
router.use('/users', users);

router.get('/profile', isLoggedIn, function(req, res) {
  res.json({
      success: true,
      user : req.user
  });
});

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;
