import { View, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
// Importação do pacote de ícones do Expo
import { MaterialIcons } from '@expo/vector-icons';
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
  watchPositionAsync,
  LocationAccuracy
} from 'expo-location';

// Vamos adicionar alguns estilos novos aqui
import { StyleSheet, Platform } from 'react-native';
import { useEffect, useState } from 'react';

// ✅ Mantendo a estrutura corrigida com 'navigation' e 'route'
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
    // O container deve ter flex: 1 e nenhuma cor de fundo para o mapa preencher
    <View style={localStyles.container}>

      {/* ✅ NOVO: Botão de Voltar Redondo e Azul sobre o mapa */}
      <TouchableOpacity 
        style={localStyles.backButton} 
        onPress={() => navigation.goBack()}
        activeOpacity={0.7} // Efeito de feedback no toque
      >
        {/* Usando ícone do Expo */}
        <MaterialIcons name="arrow-back" size={24} color="#FFF" />
      </TouchableOpacity>

      {
        targetLatitude && targetLongitude ? (
          <MapView
            style={localStyles.map} // Estilo para preencher a tela inteira
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
          // Exibe uma mensagem centralizada enquanto a localização carrega
          <View style={localStyles.loadingContainer}>
            <Text>Carregando localização...</Text>
          </View>
        )
      }
    </View>
  );
}

// ✅ ESTILOS LOCAIS PARA O MAPA E BOTÃO
const localStyles = StyleSheet.create({
  container: {
    flex: 1, // Preenche toda a tela disponível
    backgroundColor: '#fff',
  },
  map: {
    width: '100%', // Largura total
    height: '100%', // Altura total
    ...StyleSheet.absoluteFillObject, // Preenche todo o container pai
  },
  backButton: {
    position: 'absolute', // Importante para ficar sobre o mapa
    // Posicionamento no canto superior esquerdo com espaçamento
    top: Platform.OS === 'ios' ? 60 : 40, // Compensa a barra de status dependendo do sistema
    left: 20,
    width: 48, // Largura e altura iguais para ficar redondo
    height: 48,
    borderRadius: 24, // Metade da altura/largura para o círculo perfeito
    backgroundColor: '#007AFF', // Azul padrão do sistema (pode mudar para seu azul)
    justifyContent: 'center', // Centraliza o ícone
    alignItems: 'center',
    zIndex: 100, // Garante que o botão fique acima de qualquer elemento do mapa
    // Sombras para Android e iOS
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