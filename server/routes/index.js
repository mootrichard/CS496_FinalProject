const router = require('express').Router();
const auth = require('./auth');
const recipes = require('./recipes');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.use('/auth', auth);
router.use('/recipes', recipes);

function loggedIn(req, res, next){
  if(req.isAuthenticated()){
    next();
  } else {
    res.status(401).json({error: "Unauthorized"});
  }
}

module.exports = router;
