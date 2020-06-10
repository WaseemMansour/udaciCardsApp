import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import { purple, white } from '../utils/colors'

class Deck extends React.Component {
  render() {
    const { route, deckName, questions, navigation, state } = this.props
    const deckTitle = route.params.deckName || deckName
    const deckQuestions = state[deckTitle].questions
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text  style={styles.heading}>{deckTitle}</Text>
        <Text style={styles.subHeading}>{deckQuestions.length } cards</Text>
        <TouchableOpacity style={[styles.button, {backgroundColor:'tomato', marginTop: 50}]} onPress={()=> navigation.push('Add Card', { deckTitle })}>
          <Text style={styles.buttonText}>Add Card</Text>
        </TouchableOpacity>
        {
          deckQuestions.length ?
          <TouchableOpacity style={styles.button} onPress={()=> navigation.push('Quiz', {cards: deckQuestions })}>
            <Text style={styles.buttonText}>Start Quiz</Text>
          </TouchableOpacity>
          : null
        }
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 40,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center'
  },
  subHeading: {
    marginTop: 5,
    fontSize: 22
  },
  button: {
    backgroundColor: purple,
    alignSelf: 'stretch',
    padding: 8,
    marginTop: 10,
    marginBottom: 5,
    marginEnd: 50,
    marginStart: 50,
    borderRadius: 5,
  },
  buttonText: {
    color: white,
    padding: 8,
    textAlign: 'center',
  }
})

const mapStateToProps = state => {
  return {
    state
  }
}

export default connect(mapStateToProps)(Deck)