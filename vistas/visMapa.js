import React, { useState, useEffect } from 'react';
import { Platform, View, StyleSheet, alert } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { Text } from '@rneui/themed';
//import MapView from 'react-native-maps'
import MapView, { Marker } from "react-native-maps";

const visMapa = (props) => {

  const [coordenadas, setCoordenadas] = useState({
    nombreCliente: "Desconocido",
    longitudeCliente: 0,
    latitudeCliente: 0,
    longitudeAdministrador: 0,
    latitudeAdministrador: 0,
    longitude: 0.01,
    latitude: 0.01,
    longitudeDelta: 0.01,
    latitudeDelta: 0.01,
  });

  const fncObtenerCoordenadas = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    // * Obtener la ubicación del dispositivo
    let ubicacion = await Location.getCurrentPositionAsync({});
    setCoordenadas({
      ...coordenadas,
      nombreCliente: props.route.params.nombreCliente,
      longitudeCliente: props.route.params.longitude,
      latitudeCliente: props.route.params.latitude,
      latitudeAdministrador: ubicacion.coords.latitude,
      longitudeAdministrador: ubicacion.coords.longitude,
    });

  }

  useEffect(() => {
    fncObtenerCoordenadas();
  }, []);

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={coordenadas}
      region={coordenadas}
      paddingAdjustmentBehavior="always"
      showsUserLocation={true}
      showsMyLocationButton={true}
      zoomControlEnabled={true}
      toolbarEnabled={true}
      userLocationCalloutEnabled={true}
      followsUserLocation={true}
      userLocationAnnotationTitle={true}
    //onRegionChangeComplete={coordenadas => setCoordenadas(coordenadas)}
    >
      <Marker
        title="Cliente"
        description={coordenadas.nombreCliente.toString()}
        coordinate={{
          latitude: parseFloat(coordenadas.latitudeCliente.toString()),
          longitude: parseFloat(coordenadas.longitudeCliente.toString())
        }}></Marker>
      <Marker
        title="Administrador"
        pinColor={'green'}
        description="Soy el administrador"
        coordinate={{
          latitude: parseFloat(coordenadas.latitudeAdministrador.toString()),
          longitude: parseFloat(coordenadas.longitudeAdministrador.toString())
        }}>
      </Marker>
    </MapView>
  );
};


export default visMapa;