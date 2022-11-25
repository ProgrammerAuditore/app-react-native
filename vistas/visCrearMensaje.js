import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Card, Input, Text, Button, Icon, Alert } from '@rneui/base';
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

  const getUserById = async (Id) => {
    try {
      await firebase.conexion
        .collection('bdMonitoreo')
        .doc(Id)
        .get()
        .then((documentSnapshot) => {
          if (documentSnapshot.exists) {
            setState({
              ...state,
              idDocumento: Id,
              dataCorreo: documentSnapshot.data().dataCorreo,
              dataNombre: documentSnapshot.data().dataNombre,
            });
          }
        })
        .catch(() => {
          alert("Error")
        });

    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    getUserById(props.route.params.paramId);
  }, []);

  return (
    <ScrollView>
      <View style={{ flex: 1, flexDirection: "column" }}>
        <Card>
          <Card.Title>Mensajeria</Card.Title>
          <Card.Divider></Card.Divider>

          {/* Campo: Nombre */}
          <View>
            <Text>Nombre</Text>
            <Input
              value={state.dataNombre}
              onChangeText={(Valor) => handlerChangeText('dataNombre', Valor)}
              placeholder='Ingresar nombre'
              disabled
            ></Input>
          </View>

          {/* Campo: Correo */}
          <View>
            <Text>Correo</Text>
            <Input
              value={state.dataCorreo}
              onChangeText={(Valor) => handlerChangeText('dataCorreo', Valor)}
              placeholder='Ingresar correo'
              disabled
            ></Input>
          </View>

          {/* Campo: Mensaje */}
          <View>
            <Text>Mensaje</Text>
            <Input
              multiline={true}
              numberOfLines={7}
              style={{ height: 200, textAlignVertical: 'top', marginTop: 10 }}
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
