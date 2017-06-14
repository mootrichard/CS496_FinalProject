import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView
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
        <View style={{
          borderBottomWidth: 1,
          borderColor: 'rgba(0, 0, 0, 0.4)',
          flex:1,
          padding: 10,
          alignSelf: 'stretch'
        }} key={i}>
          <Text style={styles.title}>{recipe.name}</Text>
          <View>
            <Text style={styles.detail}>Cook Time: {recipe.cookTime} {recipe.cookTimeQty}</Text>
            <Text style={styles.ingredients}>Ingredients: </Text>
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
    return (
        <ScrollView style={styles.container}>
          <Text></Text>
          {this.showRecipe()}
        </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 45,
    alignSelf: 'stretch'
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  ingredients: {
    fontSize: 18
  },
  detail: {
    fontWeight: 'bold'
  }
});
