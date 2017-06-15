const router = require('express').Router();
const recipeController = require('../controllers/recipes');

/* GET users listing. */
router.get('/:googleId', recipeController.retrieve);
router.post('/', recipeController.create);
router.patch('/:recipeId', recipeController.update);
router.delete('/:recipeId', recipeController.delete);

module.exports = router;
