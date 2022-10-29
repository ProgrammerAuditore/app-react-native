import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, Button, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';

const visDatos = (props) => {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,

  });
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      // let location = await Location.getCurrentPositionAsync({});
      // setLocation(location);
      let ubicacion = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: ubicacion.coords.latitude,
        longitude: ubicacion.coords.longitude,

      });
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text h1>Latitud:</Text>
        <Text style={styles.paragraph}>{location.latitude}</Text>
        <Text h1>Longitud:</Text>
        <Text style={styles.paragraph}>{location.longitude}</Text>

      </View>
      <View>
        <Button title="Abrir Mapa"
          onPress={() => props.navigation.navigate('visMapa', {
            latitude: parseFloat(location.latitude),
            longitude: parseFloat(location.longitude),
          })}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default visDatos