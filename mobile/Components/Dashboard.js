import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { NativeRouter, Route, Link } from 'react-router-native';

export default class Dashboard extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <View style={styles.container}>
        <Text>This is the dashboard</Text>
        <Link to="/">
          <Text style={styles.button}>Logout</Text>
        </Link>
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
  }
});
