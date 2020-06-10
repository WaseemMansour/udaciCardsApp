import React from 'react'
import { Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { addQuestionToDeck } from '../actions'
import { saveCard } from '../utils/api'

import { purple, white } from '../utils/colors'


class NewCard extends React.Component {
  state = {
    question: '',
    answer:''
  }

  handleQInputChange = (question) => {
    this.setState({question})
  }

  handleAInputChange = (answer) => {
    this.setState({answer})
  }

  toDeckView = () => {
    this.props.navigation.goBack()
  }


  submitCard = () => {
    const {deckTitle} = this.props.route.params
    const {question, answer} = this.state
    if(question && answer) {
      this.props.onAddNewCard(question, answer, deckTitle)
      this.setState({input: ''})
      this.toDeckView()
      saveCard({question, answer}, deckTitle)  
    }
    
  }

  render() {
    
    const { input } = this.state
    return (
      <KeyboardAvoidingView behavior="padding" style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.heading}>Question & Answer</Text>
        <TextInput style={styles.input} onChangeText={this.handleQInputChange} value={input} placeholder="Enter Question" />
        <TextInput style={[styles.input, {marginTop: 5}]} onChangeText={this.handleAInputChange} value={input} placeholder="Enter Answer" />
        <TouchableOpacity style={styles.button} onPress={()=> this.submitCard()}>
          <Text style={styles.buttonText}>Create Card</Text>
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
    onAddNewCard: (question, answer, deck)=> dispatch(addQuestionToDeck
      ({question, answer, deck}))
  }
}

export default connect(null, mapDispatchToProps)(NewCard)