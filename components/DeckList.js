import React from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'

import * as _api from '../utils/api'
import { FlatList } from 'react-native-gesture-handler';
import { purple } from '../utils/colors'


class DeckList extends React.Component {
  state = {
    bounceValue: new Animated.Value(1),
  }
  componentDidMount() {
    _api.getDecks()
      .then(decks => {
        this.props.getAllDecks(decks)
      })
  }

  handleAnimation(item, nav) {
    const { bounceValue } = this.state
    Animated.sequence([
      Animated.timing(bounceValue, { duration: 400, toValue: 1.04}),
      Animated.spring(bounceValue, { toValue: 1, friction: 4})
    ]).start()
    setTimeout(()=> nav.navigate('Deck', {deckName: item.title, questions: item.questions}),500)
    
  }

  renderItem = ({ item }, nav) => {
    const { bounceValue } = this.state
    return (
      <Animated.View style={[ styles.deckItem, {transform: [{scale: bounceValue}]} ]}>
        <Text style={styles.deckTitle} onPress={()=> this.handleAnimation(item, nav)}>{item.title}</Text>
        <Text style={styles.deckQuestions}>{item.questions.length} Cards</Text>
      </Animated.View>
    )
    
  }

  render() {
    const {navigation, deckItems} = this.props
    const deckItemsArr = Object.keys(deckItems).map(item=>deckItems[item])
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <FlatList
          style={{flex: 1, alignSelf: 'stretch'}}
          data={deckItemsArr}
          renderItem={(item)=>this.renderItem(item, navigation)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View> 
    )
  }
}

const styles = StyleSheet.create({
  deckItem: {
    flex: 1, 
    justifyContent: 'center', 
    alignSelf: 'stretch',
    margin: 20,
    minHeight: 100,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: purple,
    

  },
  deckTitle: {
    fontSize: 28,
    alignContent: 'center',
    textAlign: 'center',
    marginBottom: 10,
    color: 'tomato'
  },
  deckQuestions: {
    textAlign: 'center',
    color: purple
  }
})


const mapStateToProps = decks => {
  return {
    deckItems: decks
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllDecks: (decks)=> dispatch(receiveDecks(decks))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DeckList)