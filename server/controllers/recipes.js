const Recipe = require('../models/recipes');


module.exports = {
  create: (req, res, next)=>{
    console.log(req.body);
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
      console.log(recipes);
      res.json(recipes);
    })
  },
  delete: (req, res, next)=>{

  },
  update: (req, res, next)=>{

  }
};
