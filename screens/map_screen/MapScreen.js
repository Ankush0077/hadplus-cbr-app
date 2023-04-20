import React, { useState, useEffect} from 'react'

import * as Location from 'expo-location';

import Map from './components/Map';

const MapScreen = ({ navigation }) => {

    const [location, setLocation] = useState({'coords': {'latitude': 31.5892, 'longitude': 76.9182}});

    useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <>
        <Map navigation={navigation} location={location} />
    </>
  );
}

export default MapScreen