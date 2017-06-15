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
  Button,
  Linking
} from 'react-native';
import { NativeRouter, Route, Link, Redirect } from 'react-router-native';
import { Provider } from 'react-redux';

import Dashboard from './Components/Dashboard.js';
import Auth from './Components/Auth';
import CreateRecipe from './Components/CreateRecipe';
import EditDeleteRecipe from './Components/EditDeleteRecipe';
import store from './redux/store';


export default class CS496FinalProject extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: undefined, // user has not logged in yet
    };
  }

  componentDidMount(){
    Linking.addEventListener('url', this.handleOpenURL);
    // Launched from an external URL
    Linking.getInitialURL().then((url) => {
      if (url) {
        this.handleOpenURL({ url });
      }
    }).catch(err => console.log(err));
  }

  componentWillUnmount() {
    // Remove event listener
    Linking.removeEventListener('url', this.handleOpenURL);
  };

  // Open URL in a browser
  openURL = (url) => {
      Linking.openURL(url);
  };

  handleOpenURL = ({ url }) => {
    // Extract stringified user string out of the URL
    const [, user_string] = url.match(/user=([^#]+)/);
    this.setState({
      // Decode the user string and parse it into JSON
      user: JSON.parse(decodeURI(user_string))
    });
    if (Platform.OS === 'ios') {
      SafariView.dismiss();
    }
  };

  loginWithGoogle = () => this.openURL('https://richardmoot.ngrok.io/auth/google');

  Home = (props)=>{
      return (
            <View>
              <Text style={styles.welcome}>Recipe App</Text>
              <TouchableHighlight
                onPress={this.loginWithGoogle}>
                <Text style={styles.googleButton}>
                  Login Google+
                </Text>
              </TouchableHighlight>
            </View>
      )
  };

  Logout(){
    this.openURL('https://richardmoot.ngrok.io/auth/logout');
  }

  render() {
    return (
      <Provider store={store}>
        <NativeRouter>
          <View style={styles.container}>

          {this.state.user && (<Redirect to="/dashboard" />)}
          <Route path="/dashboard" render={()=>{
            return(<Dashboard user={this.state.user} />)
          }} />
          <Route exact path="/" component={this.Home} />
          <Route exact path="/auth" component={Auth} />
          <Route path="/create" render={()=>{
            return(<CreateRecipe user={this.state.user} />)
          }} />
          <Route exact path="/logout" render={()=>{
            this.Logout();
            return (
              this.Home()
            )
          }}/>
          <Route exact path="/edit/:recipeId" component={EditDeleteRecipe} />
          </View>
        </NativeRouter>
      </Provider>
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
    shadowOpacity: 0.25,
    textAlign: 'center',
    fontSize: 25
  },
  welcome: {
    fontSize: 50,
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
