import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

export default class RecipeTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      recipes: []
    };
    this.showRecipe = this.showRecipe.bind(this);
  }

  componentWillMount(){
    fetch(`https://richardmoot.ngrok.io/recipes/${this.props.user.googleId}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: "GET"
    }).then((res)=>{
      return res.json()
    }).then((results)=>{
      this.setState({
        recipes: results
      })
    }).catch(err=>console.log(err))
  }

  showRecipe() {
    return this.state.recipes.map(function(recipe, i){
      return(
        <View key={i}>
          <Text>Recipe: {recipe.name}</Text>
          <View>
            <Text>Cook Time: {recipe.cookTime} {recipe.cookTimeQty}</Text>
            <Text>Ingredients: </Text>
            {
              (
                recipe.ingredients.map((ingredient, i)=>{
                  return(
                    <View key={ingredient+i}>
                      <Text>{'\t'}{'\u2022'} {ingredient.quantity} {ingredient.modifier} {ingredient.name}</Text>
                    </View>
                  )
                })
              )
            }
          </View>
        </View>
      );
    });
  }

  render(){
    // let allRecipes = this.state.recipes.map((elem)=>{
    //   showEachRecipe(elem);
    // });
    return (
      <View>
        <View>
          {this.showRecipe()}
        </View>
      </View>
    )
  }
}
