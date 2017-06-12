/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Navigator
} from 'react-native';
import { MemoryRouter, Route, Link } from 'react-router-native';
import Dashboard from './Components/Dashboard.js';
import Auth from './Components/Auth';

const Home = (props)=>{
  return (
      <Link to="/auth" >
        <Text style={styles.googleButton} >Login Google+</Text>
      </Link>
  )
}

export default class CS496FinalProject extends Component {
  render() {
    return (
      <MemoryRouter>
        <View style={styles.container}>

        <Route exact path="/" component={Home} />
        <Route exact path="/auth" component={Auth} />
        </View>
      </MemoryRouter>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  googleButton: {
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('CS496FinalProject', () => CS496FinalProject);
