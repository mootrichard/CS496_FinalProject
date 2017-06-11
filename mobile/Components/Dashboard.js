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
      <View>
        <Link to="/">
          <Text>Back</Text>
        </Link>
        <Text>This is the dashboard</Text>
      </View>
    )
  }
}
