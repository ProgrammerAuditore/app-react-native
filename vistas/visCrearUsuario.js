import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Input, Text, Button } from '@rneui/base';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import firebase from '../firebase';

const visCrearUsuario = (props) => {

  const [data, setData] = useState({
    correo: "",
    nombre: "",
    latitude: 0,
    longitude: 0,
    fecha: "",
  });

  const [errorMsg, setErrorMsg] = useState(null);

  const fncRegistrarDatos = async () => {
    console.log(data);
    if (data.nombre.trim() === '' || data.nombre.trim().length == 0) {
      alert("Escribe un nombre.");
    } else {
      await firebase.conexion
        .collection('bdMonitoreo')
        .add({
          dataNombre: data.nombre,
          dataLatitude: data.latitude,
          dataLongitude: data.longitude
        }).then((resp) => {
          alert("Datos registrados exitosamente.");
          props.navigation.navigate('visPrincipal');
        });
    }
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
        nombre: "",
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

          {/* Campo: Correo */}
          <View>
            <Text>Correo</Text>
            <Input
              onChangeText={(Valor) => handlerChangeText('correo', Valor)}
              placeholder='Ingresar correo'
            ></Input>
          </View>


          {/* Campo: Nombre */}
          <View>
            <Text>Nombre</Text>
            <Input
              onChangeText={(Valor) => handlerChangeText('nombre', Valor)}
              placeholder='Ingresar nombre'
            ></Input>
          </View>


          {/* Campo: Latitude */}
          <View>
            <Text>Latitude</Text>
            <Input
              disabled={true}
              value={String(data.latitude)}
              placeholder='Ingresar latitude'
            ></Input>
          </View>

          {/* Campo: Longitude */}
          <View>
            <Text>Longitude</Text>
            <Input
              disabled={true}
              value={String(data.longitude)}
              placeholder='Ingresar longitude'
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
            onPress={() => fncRegistrarDatos()}
          />

          {/* Botón : Abrir Mapa */}
          <Button
            title="Abrir mapa"
            buttonStyle={{ backgroundColor: 'rgba(255, 193, 7, 1)' }}
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

export default visCrearUsuario