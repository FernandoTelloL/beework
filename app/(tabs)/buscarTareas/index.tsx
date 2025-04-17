import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
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
        <View style={styles.markerInfo}>
          <Text style={styles.markerTitle}>{selectedMarker.title}</Text>
          <Text>{selectedMarker.date}</Text>
          <Text>{selectedMarker.picker}</Text>
          <Text>{selectedMarker.cost}</Text>
          <TouchableOpacity onPress={() => setSelectedMarker(null)}>
            <Text style={styles.closeButton}>Cerrar</Text>
          </TouchableOpacity>
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
  markerInfo: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  markerTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  closeButton: {
    marginTop: 10,
    color: 'blue',
    textAlign: 'right',
  },
});
