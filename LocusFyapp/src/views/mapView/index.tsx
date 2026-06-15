import { View, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { MaterialIcons } from '@expo/vector-icons';
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
  watchPositionAsync,
  LocationAccuracy
} from 'expo-location';


import { StyleSheet, Platform } from 'react-native';
import { useEffect, useState } from 'react';

export default function MapViewScreen({ navigation, route }: any) {
  const [location, setLocation] = useState<LocationObject | null>(null);

  const employeeCoords = route?.params?.employeeCoords;
  const employeeName = route?.params?.employeeName;

  async function requestLocationPermissions() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
    }
  }

  useEffect(() => {
    if (!employeeCoords) {
      requestLocationPermissions();

      let subscription: any;
      
      const startWatching = async () => {
        subscription = await watchPositionAsync({
          accuracy: LocationAccuracy.Highest,
          timeInterval: 30000,
          distanceInterval: 1
        }, (response) => {
          setLocation(response);
        });
      };

      startWatching();

      return () => {
        if (subscription) subscription.remove();
      };
    }
  }, [employeeCoords]);

  const targetLatitude = employeeCoords ? employeeCoords.latitude : location?.coords.latitude;
  const targetLongitude = employeeCoords ? employeeCoords.longitude : location?.coords.longitude;

  return (
    <View style={localStyles.container}>

      
      <TouchableOpacity 
        style={localStyles.backButton} 
        onPress={() => navigation.goBack()}
        activeOpacity={0.7} 
      >
        
        <MaterialIcons name="arrow-back" size={24} color="#FFF" />
      </TouchableOpacity>

      {
        targetLatitude && targetLongitude ? (
          <MapView
            style={localStyles.map} 
            initialRegion={{
              latitude: targetLatitude,
              longitude: targetLongitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005
            }}
          >
            <Marker
              coordinate={{
                latitude: targetLatitude,
                longitude: targetLongitude
              }}
              title={employeeName || "Minha Localização"}
              description={employeeName ? "Último ponto batido aqui" : ""}
            />
          </MapView>
        ) : (
          
          <View style={localStyles.loadingContainer}>
            <Text>Carregando localização...</Text>
          </View>
        )
      }
    </View>
  );
}

// não mexe POR FAVOR FOI RUIM DE ACERTAR 
// fico feio pkrl KKKKKKKKKKKKKKKKKKKKKKKKKk
const localStyles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff',
  },
  map: {
    width: '100%', //  deixa assim
    height: '100%', //  deixa
    ...StyleSheet.absoluteFillObject, 
  },
  backButton: {
    position: 'absolute', 
  
    top: Platform.OS === 'ios' ? 60 : 40, 
    left: 20,
    width: 48, 
    height: 48,
    borderRadius: 24, 
    backgroundColor: '#007AFF', 
    justifyContent: 'center', 
    alignItems: 'center',
    zIndex: 100, 

    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});