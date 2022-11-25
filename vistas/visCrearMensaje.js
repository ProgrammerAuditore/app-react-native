import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Card, Input, Text, Button, Icon, Alert } from '@rneui/base';
import { useState } from 'react';
import firebase from '../firebase';

const visCrearMensaje = (props) => {

  const [state, setState] = useState({
    dataCorreo: "Default",
    dataNombre: "Default",
    dataMensaje: "Default",
  });

  const handlerChangeText = (dataCorreo, value) => {
    setState({ ...state, [dataCorreo]: value });
    console.log(state);
  }

  const fncEnviarMensaje = async () => {
    if (state.dataMensaje === '' || state.dataCorreo === '') {
      alert('Ingrese el campo Id o Nombres');
    } else {
      await firebase.conexion
        .collection('clMensajes')
        .add({
          dataCorreo: state.dataCorreo,
          dataNombre: state.dataNombre,
          dataMensaje: state.dataMensaje,
        });
      alert('Mensaje registrado exitosamente.');
      props.navigation.navigate('visPrincipal');
    }
  }

  return (
    <ScrollView>
      <View style={{ flex: 1, flexDirection: "column" }}>
        <Card>
          <Card.Title>Crear usuario</Card.Title>
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

          {/* Campo: Mensaje */}
          <View>
            <Text>Mensaje</Text>
            <Input
              onChangeText={(Valor) => handlerChangeText('dataMensaje', Valor)}
              placeholder='Ingresar mensaje'
            ></Input>
          </View>


          {/* Botón : Enviar mensaje */}
          <Button
            title="Enviar mensaje"
            buttonStyle={{ backgroundColor: 'rgba(111, 202, 186, 1)' }}
            containerStyle={{
              marginVertical: 5,
              borderRadius: 5,
            }}
            titleStyle={{ color: 'white', marginHorizontal: 20 }}
            onPress={() => fncEnviarMensaje()}
          />

        </Card>
      </View>

    </ScrollView>
  );
}

export default visCrearMensaje;

const styles = StyleSheet.create({});
