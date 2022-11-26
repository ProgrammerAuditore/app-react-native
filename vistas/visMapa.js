import React, { useState, useEffect } from 'react';
import { Platform, View, StyleSheet, alert } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { Text } from '@rneui/themed';
//import MapView from 'react-native-maps'
import MapView, { Marker } from "react-native-maps";

const visMapa = (props) => {

  const [ubicacionCliente, setUbicacionCliente] = useState({
    longitudeCliente: props.route.params.longitude,
    latitudeCliente: props.route.params.latitude,
    longitude: 0.01,
    latitude: 0.01,
    longitudeDelta: 0.01,
    latitudeDelta: 0.01,
  });

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      // let location = await Location.getCurrentPositionAsync({});
      // setData(location);
      let ubicacion = await Location.getCurrentPositionAsync({});
      setUbicacionCliente({
        ...ubicacionCliente,
        longitudeCliente: props.route.params.longitude,
        latitudeCliente: props.route.params.latitude,
        latitude: ubicacion.coords.latitude,
        longitude: ubicacion.coords.longitude,
      });
    })();
  }, []);

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={ubicacionCliente}
      region={ubicacionCliente}
      //onRegionChangeComplete={ubicacionCliente => setUbicacionCliente(ubicacionCliente)}
    >
      <Marker
        title="Administrador"
        description="Soy el administrador"
        coordinate={{
          latitude: parseFloat(ubicacionCliente.latitude),
          longitude: parseFloat(ubicacionCliente.longitude)
        }}>
      </Marker>
      <Marker
        title="Cliente"
        description="Boris"
        coordinate={{
          latitude: parseFloat(props.route.params.latitude),
          longitude: parseFloat(props.route.params.longitude)
        }}></Marker>
    </MapView>
  );
};


export default visMapa;