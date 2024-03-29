import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { NativeRouter, Route, Link } from 'react-router-native';
import { reduxForm, Field, FieldArray } from 'redux-form';

function MyTextInput(props) {
  const { input, meta, ...inputProps } = props;

  return (
    <View style={styles.inputContainer}>
      <TextInput
        {...inputProps}
        onChangeText={input.onChange}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        value={input.value}
        style={styles.input}
      />
    </View>
  );
}

const renderIngredients = ({ fields }) => (
  <View>
    <TouchableOpacity onPress={() => fields.push({})}>
      <Text>Add Ingredient</Text>
    </TouchableOpacity>
    {fields.map((ingredient, index) =>
      <View key={index}>
        <TouchableOpacity
          onPress={() => fields.remove(index)}>
          <Text>Remove Ingredient</Text>
        </TouchableOpacity>
        <Text>Ingredient #{index + 1}</Text>
        <Field
          name={`${ingredient}.name`}
          component={MyTextInput}
          placeholder="Name"/>
        <Field
          name={`${ingredient}.quantity`}
          component={MyTextInput}
          placeholder="Quantity"/>
        <Field
          name={`${ingredient}.modifier`}
          component={MyTextInput}
          placeholder="lbs, chopped, oz, etc..."/>
      </View>
    )}
  </View>
)

class CreateRecipe extends Component {
  constructor(props){
    super(props);
    this.sendData = this.sendData.bind(this);
  }

  sendData(formData){
    formData.recipeOwner = this.props.user.googleId;
    fetch("https://richardmoot.ngrok.io/recipes", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: "POST",
      body: JSON.stringify(formData)
    }).then((res)=>{
      return res.json()
    }).then((results)=>{
      console.log(results);
    }).catch(err=>console.log(err));
  }

  render(){
    return (
      <View>
        <ScrollView style={styles.container} keyboardShouldPersistTaps={'handled'}>
          <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Recipe Name</Text>
          <Field
            style={{width: 100}}
            name={'name'}
            component={MyTextInput}
            placeholder={'name'}
          />
          <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Cook Time</Text>
          <Field
            name={'cookTime'}
            component={MyTextInput}
            placeholder={'1, 10, 25'}
          />
          <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Cook Time Qty</Text>
          <Field
            name={'cookTimeQty'}
            component={MyTextInput}
            placeholder={'mins, secs, hours'}
          />
          <FieldArray
            name={'ingredients'}
            component={renderIngredients}
          />
          <View style={styles.buttonWrapper}>
            <Link style={{padding: 5}} to="/dashboard">
              <Text style={styles.button}>Back</Text>
            </Link>
            <TouchableOpacity style={{padding: 5}} onPress={this.props.handleSubmit(this.sendData)}>
              <Text style={styles.button}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 45
  },
  formSubmit: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 25,
    padding: 5
  },
  input: {
      borderColor: 'black',
      borderWidth: 1,
      height: 37,
      width: 300
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.4)',
    marginTop: 20
  },
  valid: {
    borderColor: '#53E69D'
  },
  invalid: {
    borderColor: '#F55E64'
  },
  button: {
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
    fontSize: 25
  },
  buttonWrapper: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection:'row',
    justifyContent: 'center',
    margin: 10
  }
});

export default reduxForm({
  form: 'createRecipe'
})(CreateRecipe);
