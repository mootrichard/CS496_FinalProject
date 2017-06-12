const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
  name: String,
  quantity: Number,
  modifier: String
});

const recipeSchema = new Schema({
  recipeOwner: String,
  name: String,
  cookTime: Number,
  cookTimeQty: String,
  ingredients: [ingredientSchema]
});

const Recipe = mongoose.model('recipe', recipeSchema);

module.exports = Recipe;
