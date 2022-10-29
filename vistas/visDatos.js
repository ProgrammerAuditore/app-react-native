import React, { useState, useEffect } from 'react';
import { Platform, View, StyleSheet, ScrollView } from 'react-native';
import { Card, Input, Text, Button, Icon, Alert } from '@rneui/base';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import firebase from '../firebase';

const visDatos = (props) => {

  const [data, setData] = useState({
    nombre: "",
    latitude: 0,
    longitude: 0,
  });

  const [errorMsg, setErrorMsg] = useState(null);

  const fncGuardarDato = async () => {
    await firebase.conexion
      .collection('bdMonitoreo')
      .add({
        dataNombre: data.nombre,
        dataLatitude: data.latitude,
        dataLongitude: data.longitude
      });
  }

  const handlerChangeText = (key, value) => {
    setData({ ...data, [key]: value });
  }

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
      setData({
        latitude: ubicacion.coords.latitude,
        longitude: ubicacion.coords.longitude,
      });
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (data) {
    text = JSON.stringify(data);
  }

  return (
    <ScrollView>
      <View style={{ flex: 1, flexDirection: "column" }}>
        <Card>
          <Card.Title>Registrar Coordenadas</Card.Title>
          <Card.Divider></Card.Divider>

          {/* Campo: Nombre */}
          <View>
            <Text>ID</Text>
            <Input
              onChangeText={(Valor) => handlerChangeText('nombre', Valor)}
              placeholder='Ingresar ID'
            ></Input>
          </View>


          {/* Campo: latitude */}
          <View>
            <Text>ID</Text>
            <Input
              value={String(data.latitude)}
              placeholder='Ingresar ID'
            ></Input>
          </View>

          {/* Campo: longitude */}
          <View>
            <Text>Longitude</Text>
            <Input
              value={String(data.longitude)}
              placeholder='Ingresar ID'
            ></Input>
          </View>

          {/* Botón : Guardar Datos */}
          <Button
            title="Guardar"
            buttonStyle={{ backgroundColor: 'rgba(111, 202, 186, 1)' }}
            containerStyle={{
              marginVertical: 5,
              borderRadius: 5,
            }}
            titleStyle={{ color: 'white', marginHorizontal: 20 }}
            onPress={() => fncGuardarDato()}
          />

          {/* Botón : Abrir Mapa */}
          <Button
            title="Abrir mapa"
            buttonStyle={{ backgroundColor: 'rgba(111, 202, 186, 1)' }}
            containerStyle={{
              marginVertical: 5,
              borderRadius: 5,
            }}
            titleStyle={{ color: 'white', marginHorizontal: 20 }}
            onPress={() => props.navigation.navigate('visMapa', {
              latitude: parseFloat(data.latitude),
              longitude: parseFloat(data.longitude),
            })}
          />

        </Card>
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