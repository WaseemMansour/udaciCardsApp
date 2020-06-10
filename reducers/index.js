import { RECEIVE_DECKS, NEW_DECK, ADD_QUESTION_TO_DECK } from '../actions'
const initState = {
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
function decks (state = initState, action) {
  switch (action.type) {
    case RECEIVE_DECKS: 
      return {
        ...state,
        ...action.decks
      }
    case NEW_DECK :
      return {
        ...state,
        [action.deck]: {
          title: action.deck,
          questions: []
        }
      }
    case ADD_QUESTION_TO_DECK:
      const { question, answer, deck } = action
      return {
        ...state,
        [deck]: {
          ...state[deck],
          questions: [
            ...state[deck].questions,
            {
              question,
              answer
            }
          ]
        }
      }
    default : 
      return state      
  }
}

export default decks