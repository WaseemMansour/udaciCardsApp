import React from 'react';
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import NewCard from './components/NewCard'
import Deck from './components/Deck'
import Quiz from './components/Quiz'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';


import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { setLocalNotification } from './utils/helpers'



const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

function HomeScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Udaci Cards" component={DeckList} />
      <Stack.Screen name="Deck" component={Deck} options={({route})=>({title: route.params.deckName})} />
      <Stack.Screen name="Quiz" component={Quiz} />
      <Stack.Screen name="Add Card" component={NewCard} />
    </Stack.Navigator> 
  )
}

function AddDeckScreen() {
  return (
    <Stack.Navigator>      
      <Stack.Screen name="Add Deck" component={NewDeck} />
    </Stack.Navigator> 
  )
}



export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <NavigationContainer>
        <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Decks') {
                  iconName = focused ? 'ios-list-box' : 'ios-list';
                } else if (route.name === 'Add Deck') {
                  iconName = focused
                    ? 'ios-add-circle'
                    : 'ios-add-circle-outline';
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: 'tomato',
              inactiveTintColor: 'gray',
            }}
          >
            <Tab.Screen name="Decks" component={HomeScreen} />
            <Tab.Screen name="Add Deck" component={AddDeckScreen} />
          </Tab.Navigator>

          
        </NavigationContainer>
      </Provider>
    )
  }
}
