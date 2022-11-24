import React, { useState, useEffect } from 'react';
import { Platform, View, StyleSheet, alert } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { Text } from '@rneui/themed';
//import MapView from 'react-native-maps'
import MapView, { Marker } from "react-native-maps";

const visMapa = (props) => {

  const [region, setRegion] = useState({
    longitude: props.route.params.longitude,
    latitude: props.route.params.latitude,
    longitudeDelta: 0.01,
    latitudeDelta: 0.01,
  });

  return (
    <MapView
      style={{ flex: 1 }}
      region={region}
      onRegionChangeComplete={region => setRegion(region)}
    >
      <Marker coordinate={{
        latitude: props.route.params.latitude,
        longitude: props.route.params.longitude
      }} />
    </MapView>
  );
};


export default visMapa;