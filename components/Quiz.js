import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { purple, white } from '../utils/colors'
import { Card } from './Card'

class Quiz extends React.Component {
  state = {
    totalCards: this.props.route.params.cards.length,
    correct: 0,
    inCorrect: 0,
    currentCard: 1,
    showAnswer: false
  }

  toggleAnswer = () => {
    this.setState((state)=>({
      ...state,
      showAnswer: !state.showAnswer
    }))
  }

  markCard = answerIs => {
    this.setState((state)=>({
      ...state,
      [answerIs]: state[answerIs] + 1,
      currentCard: state.currentCard + 1,
      showAnswer: false
    }))
  }

  resetQuiz = () => {
    this.setState({
      totalCards: this.props.route.params.cards.length,
      correct: 0,
      inCorrect: 0,
      currentCard: 1,
      showAnswer: false
    })
  }

  render() {
    const { cards } = this.props.route.params
    const { navigation } = this.props
    const { totalCards, currentCard, showAnswer, correct } = this.state
    return (
      
      cards.length && currentCard <= totalCards  ?
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Card 
            question={cards[currentCard - 1].question} 
            answer={cards[currentCard - 1].answer} 
            showAnswer={showAnswer}   
          />
          <Text style={[styles.subHeading, {color: 'tomato'}]} onPress={()=> this.toggleAnswer()}> {showAnswer ? 'Question' : 'Answer'}</Text>
          <TouchableOpacity style={[styles.button, {backgroundColor:'green', marginTop: 100}]} onPress={()=> this.markCard('correct')}>
            <Text style={styles.buttonText}>Correct</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, {backgroundColor: 'tomato'}]} onPress={()=> this.markCard('inCorrect')}>
            <Text style={styles.buttonText}>Incorrect</Text>
          </TouchableOpacity>
          <Text style={styles.quizStats}>{currentCard} of {cards.length} cards</Text>
        </View>
      :
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.subHeading}>Your Score</Text>
          <Text style={styles.heading}>%{Math.round((correct / totalCards) * 100)}</Text>
          <TouchableOpacity style={[styles.button, {backgroundColor:'green', marginTop: 100}]} onPress={()=> this.resetQuiz()}>
            <Text style={styles.buttonText}>Restart Quiz</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, {backgroundColor: 'tomato'}]} onPress={()=> navigation.goBack()}>
            <Text style={styles.buttonText}>Back to Deck</Text>
          </TouchableOpacity>
        </View>
        
    )
  }
}

const mapStateToProps = state => {
  const questions = state[this.props.route.name].questions
  return {
    cards: questions
  }
}

export default Quiz



const styles = StyleSheet.create({
  quizStats: {
    marginTop: 50,
  },
  heading: {
    fontSize: 40,
    padding: 10,
    textAlign: 'center'
  },
  subHeading: {
    marginTop: 15,
    fontSize: 22,
    fontWeight: 'bold'
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