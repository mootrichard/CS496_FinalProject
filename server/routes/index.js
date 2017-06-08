const router = require('express').Router();
const auth = require('./auth');
const users = require('./users');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.use('/auth', auth);
router.use('/users', users);

module.exports = router;
