import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MapScreen from "../screens/map_screen/MapScreen";
import HomeScreen from "../screens/home_screen/HomeScreen";
import DetectorScreen from "../screens/detector_screen/DetectorScreen";

const Tab = createBottomTabNavigator();

const BottomNavBar = () => {
  return (
    <Tab.Navigator 
        initialRouteName="Billboards Map"
        activeColor="#e91e63"
        barStyle={{ backgroundColor: '#c4c4c4' }}
    >
        <Tab.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="home" color={color} size={size} />
                ),
              }}
        />
        <Tab.Screen 
            name="Billboards Map" 
            component={MapScreen} 
            options={{
                tabBarLabel: 'Map',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="map" color={color} size={size} />
                ),
                // tabBarBadge: 3,
              }}
        />
        <Tab.Screen
            name="Illegal Billboard Detector" 
            component={DetectorScreen}
            options={{
                tabBarLabel: 'Detector',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="billboard" color={color} size={size} />
                ),
              }} 
        />
    </Tab.Navigator>
  );
}

export default BottomNavBar;