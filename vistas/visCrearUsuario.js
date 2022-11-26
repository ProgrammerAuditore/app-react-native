import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Input, Text, Button } from '@rneui/base';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import firebase from '../firebase';

const visCrearUsuario = (props) => {

  const [data, setData] = useState({
    dataCorreo: "",
    dataNombre: "",
    dataLatitude: 0,
    dataLongitude: 0,
    dataFecha: "",
  });

  const [errorMsg, setErrorMsg] = useState(null);

  const fncRegistrarDatos = async () => {
    console.log(data);
    if (data.dataNombre.trim() === '' || data.dataNombre.trim().length == 0) {
      alert("Escribe un nombre.");
    } else
      if (data.dataCorreo.trim() === '' || data.dataCorreo.trim().length == 0) {
        alert("Escribe un correo.");
      } else {
        await firebase.conexion
          .collection('clUsuarios')
          .add({
            dataNombre: data.dataNombre,
            dataLatitude: data.dataLatitude,
            dataLongitude: data.dataLongitude
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
        dataFecha: "",
        dataNombre: "",
        dataLatitude: ubicacion.coords.latitude,
        dataLongitude: ubicacion.coords.longitude,
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
            <Text>Nombre</Text>
            <Input
              onChangeText={(Valor) => handlerChangeText('dataNombre', Valor)}
              placeholder='Ingresar nombre'
            ></Input>
          </View>


          {/* Campo: Correo */}
          <View>
            <Text>Correo</Text>
            <Input
              onChangeText={(Valor) => handlerChangeText('dataCorreo', Valor)}
              placeholder='Ingresar correo'
            ></Input>
          </View>


          {/* Campo: Latitude */}
          <View>
            <Text>Latitude</Text>
            <Input
              disabled={true}
              value={String(data.dataLatitude)}
              placeholder='Ingresar latitude'
            ></Input>
          </View>


          {/* Campo: Longitude */}
          <View>
            <Text>Longitude</Text>
            <Input
              disabled={true}
              value={String(data.dataLongitude)}
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
              nombreCliente: data.dataNombre,
              latitude: data.dataLatitude,
              longitude: data.dataLongitude,
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