import { useState, useEffect } from 'react';

import { View, Image, Text } from 'react-native'
import { Card } from 'react-native-elements'

import AsyncStorage from '@react-native-async-storage/async-storage';

const ViewBillboardScreen = () => {

  const [BillboardData, setBillboardData] = useState([]);

  // async function getbillboard() {
  //   const token = await AsyncStorage.getItem("token");
  //   return token;
  // }

  const getBillboard = async () => {
    var billboard = await AsyncStorage.getItem('billboard');
    setBillboardData(JSON.parse(billboard));
  }

  useEffect(() => {
    getBillboard();
  }, [])

  return (
    <>
        <Card>
          <Card.Title>{BillboardData.governing_body}</Card.Title>
          <Card.Divider/>
          <View 
            style={{height: '90%'}} 
          >
            <Image
              style={{width:"100%" , height:"15%"}}
              source={{
                uri: `data:image/jpeg;base64,${BillboardData.billboard_image}`
                }}
            />
            <Text
              style={{fontWeight: "bold"}}
            >
              Billboard ID: 
            </Text>
            <Text>
              {BillboardData.billboard_id}
            </Text>
            <Text
              style={{fontWeight: "bold"}}
            >
              Billboard Owner ID: 
            </Text>
            <Text>
              {BillboardData.billboard_owner_id}
            </Text>
            <Text
              style={{fontWeight: "bold"}}
            >
              Latitude: 
            </Text>
            <Text>
              {BillboardData.latitude}
            </Text>
            <Text
              style={{fontWeight: "bold"}}
            >
              Longitude: 
            </Text>
            <Text>
              {BillboardData.longitude}
            </Text>
            <Text
              style={{fontWeight: "bold"}}
            >
              Address: 
            </Text>
            <Text>
              {BillboardData.address}
            </Text>
            <Text
              style={{fontWeight: "bold"}}
            >
              Land Type: 
            </Text>
            <Text>
              {BillboardData.land_type}
            </Text>
            <Text
              style={{fontWeight: "bold"}}
            >
              Billboard Type: 
            </Text>
            <Text>
              {BillboardData.billboard_type}
            </Text>
            <Text
              style={{fontWeight: "bold"}}
            >
              Heigth: 
            </Text>
            <Text>
              {BillboardData.height}
            </Text>
            <Text
              style={{fontWeight: "bold"}}
            >
              Width: 
            </Text>
            <Text>
              {BillboardData.width}
            </Text>
          </View>
        </Card>
    </>
  )
}

export default ViewBillboardScreen