const Recipe = require('../models/recipes');


module.exports = {
  create: (req, res, next)=>{
    Recipe.create({
      recipeOwner : req.body.recipeOwner,
      name : req.body.name,
      cookTime : req.body.cookTime,
      cookTimeQty : req.body.cookTimeQty,
      ingredients: req.body.ingredients
    }, (err, results)=>{
      res.json(results);
    })

  },
  retrieve: (req, res, next)=>{
    Recipe.find({
      'recipeOwner': req.params.googleId
    }, (err, recipes)=>{
      res.json(recipes);
    })
  },
  delete: (req, res, next)=>{
    Recipe.findById(req.params.recipeId, (err, recipe)=>{
      if(recipe) {
        recipe.remove();
        res.status(200).send("success");
      } else {
        res.status(404).send("not found");
      }
    })
  },
  update: (req, res, next)=>{
    Recipe.findById(req.params.recipeId, (err, recipe)=>{
      for (key in req.body){
        recipe[key] = req.body[key]
      }
      recipe.save();
      res.status(200).send("success");
    })
  }
};
