import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { BASE_BACKEND_URL } from "../../assets/constant"

import { View, Image, Alert, TouchableOpacity } from 'react-native'
import { Card } from 'react-native-elements'

const HomeScreen = ({navigation}) => {
  const [BillboardData, setBillboardData] = useState([]);

  async function gettoken() {
    const token = await AsyncStorage.getItem("token");
    return token;
  }

  const getAllBillboards = async () => {
    try{
      var token = await gettoken();

      const response = await fetch(`${BASE_BACKEND_URL}api/billboard`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
          'Content-Type': 'application/json; charset=UTF-8',
          'token': `Bearer ${token}`,
        },
      });

      if(response.status >= 200 && response.status < 300){
        const data = await response.json();
        setBillboardData(data);
        console.log("base64,"+BillboardData[0].billboard_image);
      } else {
        const json = await response.json();
        Alert.alert(JSON.stringify(json));
      }
    } catch (error) {
      Alert.alert("Some Error Occurred");
    }
  };

  useEffect(() => {
    getAllBillboards();
  }, [])

  return (
    <>
  {
    BillboardData.map((u, i) => {
      return (
        <TouchableOpacity 
          onPress={async () => {
            await AsyncStorage.setItem('billboard', JSON.stringify(u))
            navigation.navigate("View Billboard");
          }}
          >
          <Card>
            <Card.Title>{u.billboard_id}</Card.Title>
            <Card.Divider/>
            <View 
              style={{height: '40%'}}
              key={i} 
            >
              <Image
                style={{width:"100%" , height:"100%"}}
                source={{
                  uri: `data:image/jpeg;base64,${u.billboard_image}`
                  }}
              />
            </View>
          </Card>
        </TouchableOpacity>
      );
    })
  }
    </>
  )
}

export default HomeScreen