import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const markers = [
  {
    id: '1',
    title: 'Wong - 2 de Mayo',
    date: '26-nov 2:00pm - 10pm',
    picker: 'Picker - 7km aprox',
    cost: 'S. 7/hr - S. 48 Estimado',
    latitude: -9.125507433436411,
    longitude: -78.52225337865598,
  },
  {
    id: '2',
    title: 'Wong - 3 de Mayo',
    date: '26-nov 2:00pm - 10pm',
    picker: 'Picker - 7km aprox',
    cost: 'S. 7/hr - S. 48 Estimado',
    latitude: -9.124235794204067,
    longitude: -78.52153631901331,
  },
  {
    id: '3',
    title: 'Wong - 4 de Mayo',
    date: '26-nov 2:00pm - 10pm',
    picker: 'Picker - 7km aprox',
    cost: 'S. 7/hr - S. 48 Estimado',
    latitude: -9.124055711765578,
    longitude: -78.52568837828933,
  },
  {
    id: '4',
    title: 'Wong - 5 de Mayo',
    date: '26-nov 2:00pm - 10pm',
    picker: 'Picker - 7km aprox',
    cost: 'S. 7/hr - S. 48 Estimado',
    latitude: -9.128028097380016,
    longitude: -78.52380010326974,
  },
];


export default function BuscarTareasScreen() {
  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleMapPress = () => {
    setSelectedMarker(null); // Ocultar información del marcador al hacer clic en el mapa
  };

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker); // Mostrar información del marcador seleccionado
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -9.128028097380016,
          longitude: -78.52380010326974,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={handleMapPress} // Detectar clics en el mapa
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            description={`${marker.date}\n${marker.picker}\n${marker.cost}`}
            onPress={() => handleMarkerPress(marker)} // Detectar clics en el marcador
          />
        ))}
      </MapView>
      {selectedMarker && (
        <View className="absolute bottom-5 left-5 right-5 bg-white p-4 rounded-lg shadow-lg">
          <Text className="font-bold text-lg mb-2">{selectedMarker.title}</Text>
          <Text>{selectedMarker.date}</Text>
          <Text>{selectedMarker.picker}</Text>
          <Text>{selectedMarker.cost}</Text>
          <Pressable
            className="text-right"
            onPress={() => setSelectedMarker(null)}
          >
            <Text className="mt-3 text-blue-500 text-right">Cerrar</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
