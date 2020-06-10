export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const NEW_DECK = 'NEW_DECK'
export const ADD_QUESTION_TO_DECK = 'ADD_QUESTION_TO_DECK'

export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export function addDeck (deck) {
  return {
    type: NEW_DECK,
    deck
  }
}

export function addQuestionToDeck ({question, answer, deck}) {
  return {
    type: ADD_QUESTION_TO_DECK,
    question,
    answer,
    deck
  }
}