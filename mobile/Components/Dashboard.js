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
        <Text style={styles.welcome}>{this.props.user.email}</Text>
        <RecipeTable user={this.props.user} />
        <View style={styles.buttonWrapper}>
          <Link to="/logout">
            <Text style={styles.button}>Logout</Text>
          </Link>
          <Link to="/create">
            <Text style={styles.button}>Create</Text>
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
    padding: 15,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 10,
    shadowOpacity: 0.25,
    margin: 10,
    fontSize: 25
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    alignSelf: 'stretch'
  },
  buttonWrapper: {
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection:'row',
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 10
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 10,
  }
});
