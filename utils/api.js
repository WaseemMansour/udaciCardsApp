import { AsyncStorage } from 'react-native'

export const DECKS_STORAGE_KEY = 'UdaciFlashCardsApp:decks'
export const initialState = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

export function getDecks () {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
  .then(results => {
    if(results === null) {
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(initialState))
      return initialState
    } else {
      return JSON.parse(results)
    }
  })
}

export function saveDeck (deck) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [deck]: {
      title: deck,
      questions: []
    }
  }))
}

export function saveCard (question, deck) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
  .then(results => JSON.parse(results))
  .then(results => {
    const deckUpdatedQuestions = [...results[deck].questions, question]
    AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
      [deck]: {
        title: deck,
        questions: deckUpdatedQuestions
      }
    }))
  })
}