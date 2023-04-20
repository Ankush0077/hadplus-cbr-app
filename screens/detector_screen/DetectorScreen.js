import { Camera, CameraType } from 'expo-camera';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
const RNCameraMetrics = require('react-native-camera-metrics');

const DetectorScreen = () => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const isFocused = useIsFocused();

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return ( isFocused &&
    <>
      <Text>{RNCameraMetrics.FOCAL_LENGTH}</Text>
      <View style={styles.container}>
        <Camera style={styles.camera} type={CameraType.back}>
          <View style={styles.buttonContainer}>
          </View>
        </Camera>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default DetectorScreen