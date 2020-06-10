import React from 'react'
import { View, Text, TextInput, StyleSheet, Platform, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { saveDeck } from '../utils/api'

import { AppLoading} from 'expo'
import { createStackNavigator } from '@react-navigation/stack'
import { purple, white } from '../utils/colors'


class NewDeck extends React.Component {
  state = {
    input: ''
  }

  handleInputChange = (input) => {
    this.setState({input})
  }

  toDeckView = (newDeck) => {
    this.props.navigation.navigate('Deck', {name: newDeck, deckName: newDeck, questions: []})
  }


  submitDeck = () => {
    const deck = this.state.input
    if(deck) {
      this.props.onAddNewDeck(deck)
      this.setState({input: ''})
      this.toDeckView(deck)
      saveDeck(deck)  
    }
    
  }

  render() {
    
    const { input } = this.state
    return (
      <KeyboardAvoidingView behavior="padding" style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.heading}>What is the title of your new deck?</Text>
        <TextInput style={styles.input} onChangeText={this.handleInputChange} value={input} />
        <TouchableOpacity style={styles.button} onPress={()=> this.submitDeck()}>
          <Text style={styles.buttonText}>Create Deck</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
    
  }
}


const styles = StyleSheet.create({
  heading: {
    fontSize: 36,
    padding: 10,
    textAlign: 'center'
  },
  input: {
    alignSelf: 'stretch',
    height: 44,
    padding: 8,
    borderWidth: 1,
    borderColor: '#757575',
    margin: 50,
    marginBottom: 20
  },
  button: {
    backgroundColor: purple,
    alignSelf: 'stretch',
    padding: 8,
    marginEnd: 50,
    marginStart: 50,
  },
  buttonText: {
    color: white,
    padding: 8,
    textAlign: 'center',
  }
})


const mapDispatchToProps = dispatch => {
  return {
    onAddNewDeck: (deck)=> dispatch(addDeck(deck))
  }
}

export default connect(null, mapDispatchToProps)(NewDeck)