const router = require('express').Router();
const recipeController = require('../controllers/recipes');

/* GET users listing. */
router.get('/:googleId', recipeController.retrieve);
router.post('/', recipeController.create);

module.exports = router;
