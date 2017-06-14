const router = require('express').Router();
const auth = require('./auth');
const recipes = require('./recipes');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.use('/auth', auth);
router.use('/recipes', recipes);

module.exports = router;
