import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { NativeRouter, Route, Link } from 'react-router-native';
import RecipeTable from './RecipeTable';

export default class Dashboard extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <View style={styles.container}>
        <RecipeTable user={this.props.user} />
        <View style={styles.buttonWrapper}>
        <Link to="/create">
          <Text style={styles.button}>Create</Text>
        </Link>
        <Link to="/logout">
          <Text style={styles.button}>Logout</Text>
        </Link>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button:{
    textAlign: 'center',
    color: '#FFFFFF',
    backgroundColor: '#2E9298',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 10,
    shadowOpacity: 0.25
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttonWrapper: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection:'row',
        justifyContent: 'space-between',
        margin: 10
  }
});
