import {StyleSheet} from 'react-native';
import React from 'react';
import HomeScreen from './screens/Home/HomeScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddTripScreen from './screens/Add/AddTripScreen';
import TripExpenses from './screens/Trip/TripExpenses';
import AddExpensive from './screens/AddExpensive/AddExpensive';
import WelcomeScreen from './screens/WelcomeScreen/WelcomeScreen';
import SignUpScreen from './screens/SignUp/SignUpScreen';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {store} from './redux/store';
import SignInScreen from './screens/SigIn/SigInScreen';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from './config/firebase';
import {setUser} from './redux/slice/user';

const Stack = createNativeStackNavigator();

const AllProvider = () => {
  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();
  onAuthStateChanged(auth, u => {
    dispatch(setUser(u));
  });
  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddTripScreen" component={AddTripScreen} />
          <Stack.Screen name="TripExpenses" component={TripExpenses} />
          <Stack.Screen name="AddExpensive" component={AddExpensive} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="SignInScreen" component={SignInScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};
export default function App() {
  return (
    <Provider store={store}>
      <AllProvider />
    </Provider>
  );
}

const styles = StyleSheet.create({});
