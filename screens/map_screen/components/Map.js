import { useState, useEffect } from 'react';
import MapView, { Callout } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { StyleSheet, Text, Button, View, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { BASE_BACKEND_URL } from "../../../assets/constant"

const Map = ( {navigation,  location } ) => {

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
      } else {
        const json = await response.json();
        Alert.alert(JSON.stringify(json));
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  useEffect(() => {
    getAllBillboards();
  }, [])
  

  const buttonPress = async (data) => {
    await AsyncStorage.setItem('billboard', JSON.stringify(data));
    navigation.navigate("View Billboard");
  }


  return (
    <View style={styles.container}>
        <MapView 
            style={styles.map} 
            region={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.00922,
                longitudeDelta: 0.00421,
            }}
        >
            {(() => {
                const arr = [];
                for (let i = 0; i < BillboardData.length; i++) {
                  arr.push(
                    <Marker key={i}
                      coordinate={{
                        latitude: parseFloat(BillboardData[i].latitude),
                        longitude: parseFloat(BillboardData[i].longitude),
                      }} 
                      pinColor='blue'
                    >
                      <Callout onPress={
                        async () => {
                          await buttonPress(BillboardData[i]);
                        }
                      }>
                        <Text>
                          {BillboardData[i].billboard_id}
                        </Text>
                      </Callout>
                    </Marker>
                  );
                }
                return arr;
            })()}
        </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
  });

export default Map