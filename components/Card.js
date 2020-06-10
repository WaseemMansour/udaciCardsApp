import React from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { purple, white } from '../utils/colors'

export function Card(props) {
  const { question, answer, showAnswer } = props
  return (
    
      showAnswer ?
      <View>
        <Text style={styles.heading}>{answer}?</Text>
      </View>
      :
      <View>
        <Text style={styles.heading}>{question}</Text>
      </View> 
    
  )
}



const styles = StyleSheet.create({
  heading: {
    fontSize: 35,
    padding: 10,
    textAlign: 'center'
  }
})