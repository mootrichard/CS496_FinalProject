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

class EditDeleteRecipe extends Component {
  constructor(props){
    super(props);
    this.sendData = this.sendData.bind(this);
    this.state = {
      recipe: this.props.location.state.recipe
    }
    this.props.initialValues = this.props.location.state.recipe;
    this.deleteRecipe = this.deleteRecipe.bind(this);
  }

  sendData(formData){
    fetch(`https://richardmoot.ngrok.io/recipes/${this.state.recipe._id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: "PATCH",
      body: JSON.stringify(formData)
    }).then((res)=>{
      return res.json()
    }).then((results)=>{
      console.log(results);
    }).catch(err=>console.log(err));
  }


  deleteRecipe() {
    fetch(`https://richardmoot.ngrok.io/recipes/${this.state.recipe._id}`, {
      method: "DELETE"
    }).then((res)=>{
      return res.json()
    }).catch(err=>console.log(err))
  }

  render(){
    const { match } = this.props;
    return (
      <View>
        <ScrollView style={styles.container} keyboardShouldPersistTaps={'handled'}>
          <Text style={{ fontSize: 40, marginTop: 20 }}>Edit {this.state.recipe.name}</Text>
          <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Recipe Name</Text>
          <Field
            style={{width: 100}}
            name={'name'}
            component={MyTextInput}
            placeholder="Name"
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
            <TouchableOpacity style={{padding: 5}} to="/delete" onPress={this.deleteRecipe}>
              <Text style={styles.button}>Delete</Text>
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
  form: 'editDeleteRecipe',
  enableReinitialize: true,
  keepDirtyOnReinitialize: false
})(EditDeleteRecipe);
