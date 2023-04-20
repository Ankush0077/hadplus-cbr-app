import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Alert
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import CryptoJS from 'crypto-js';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import LoginSVG from '../assets/images/misc/login.svg';

import CustomButton from '../../components/CustomButton';
import InputField from '../../components/InputField';

import { BASE_BACKEND_URL } from "../../assets/constant"

const LoginScreen = ({navigation}) => {
  const [LoggedIn, SetLoggedIn] = useState(false);

  async function gettoken() {
    const token = await AsyncStorage.getItem("token");
    return token;
  }

  async function getUserId() {
    const user_id = await AsyncStorage.getItem("user_id");
    return user_id;
  }

  async function isUserLoggedIn() {
    try{
      var token = await gettoken();
      var user_id = await getUserId();

      const response = await fetch(`${BASE_BACKEND_URL}api/auth/is-login/${user_id}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
          'Content-type': 'application/json; charset=UTF-8',
          'token': `Bearer ${token}`
        },
      });

      if(response.status >= 200 && response.status < 300){
        SetLoggedIn(true);
        navigation.navigate('hadplus');
      } else {
        SetLoggedIn(false);
      }
    } catch(error){
      SetLoggedIn(false);
    }
  }

  useEffect(() => {
    isUserLoggedIn();
  }, [])

    const [Email, SetEmail] = useState('');
    const [Password, SetPassword] = useState('');

    const LoginFunction = async () => {
        try{
          const response = await fetch(`${BASE_BACKEND_URL}api/auth/login`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
              email: Email.toString(),
              password: CryptoJS.SHA256(Password.toString()).toString(CryptoJS.enc.Hex)
            }),
            headers: {
                Accept: 'application/json',
              'Content-Type': 'application/json; charset=UTF-8',
            },
          });
    
          if(response.status >= 200 && response.status < 300){
                    const json = await response.json();
                    await AsyncStorage.setItem("token", json.accessToken.toString());
                    await AsyncStorage.setItem("user_id", json.user_id.toString());
                    Alert.alert("Login Successfull!!!");
                    navigation.navigate("hadplus");
                }else{
                    const json = await response.json();
                    Alert.alert(JSON.stringify(json));
                }
        } catch (error) {
          Alert.alert(JSON.stringify(error.message));
        }
      }

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <View style={{paddingHorizontal: 25}}>
        <View style={{alignItems: 'center'}}>
          {/* <LoginSVG
            height={300}
            width={300}
            style={{transform: [{rotate: '-5deg'}]}}
          /> */}
        </View>

        <Text
          style={{
            // fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Login
        </Text>

        <InputField
          label={'Email ID'}
          icon={
            <MaterialIcons
            name="alternate-email"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
          }
          keyboardType="email-address"
          onChangeTextFunction={text => SetEmail(text)}
        />

<InputField
          label={'Password'}
          icon={
            <Ionicons
            name="ios-lock-closed-outline"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
          }
          inputType="password"
          onChangeTextFunction={text => SetPassword(text)}
        //   fieldButtonLabel={"Forgot?"}
        //   fieldButtonFunction={() => {}}
        />
        
        <CustomButton label={"Login"} onPress={() => LoginFunction()} />

      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
