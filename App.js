import React, { useState, useEffect } from 'react';

import { Text, View, Button, LogoTitle } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BottomNavBar from './components/BottomNavBar';
import LoginScreen from './screens/login_screen/LoginScreen';
import ViewBillboardScreen from './screens/view_billboard_screen/ViewBillboardScreen';

import { BASE_BACKEND_URL } from "./assets/constant"

import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <>
      <NavigationContainer
        fallback={<Text>Loading...</Text>}
      >
        <Stack.Navigator
          initialRouteName={
            'Login'
          }
        >
          <Stack.Screen
            name="hadplus"
            component={BottomNavBar}
            options={({navigation}) => ({
              headerRight: () => (
                <Button
                  onPress={ async () => {
                    await AsyncStorage.removeItem('token');
                    await AsyncStorage.removeItem('user_id');
                    navigation.navigate("Login");
                  }}
                  title="Logout"
                  color="#000000"
                />
              ),
            })}
          />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="View Billboard" component={ViewBillboardScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
