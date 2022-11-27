import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Card, Input, Text, Button, Icon, Alert, ListItem, Avatar } from '@rneui/base';
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
      props.navigation.navigate('vistListaMensajeria');
    }
  }

  const getUserById = async (Id) => {
    try {
      await firebase.conexion
        .collection('clUsuarios')
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

          {/* Campo: Detalle usuario */}
          <View>
            <ListItem>
              <View>
                <Avatar
                  rounded title="usr"
                  size="large"
                  source={{
                    uri: 'https://randomuser.me/api/portraits/men/36.jpg',
                  }}
                />
              </View>
              <ListItem.Content>
                {/* <ListItem.Title>{itemUsuario.dataCorreo}</ListItem.Title> */}
                <ListItem.Subtitle>{state.dataCorreo}</ListItem.Subtitle>
                <ListItem.Subtitle>{state.dataNombre}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          </View>

          {/* Campo: Mensaje */}
          <View>
            <Text style={{ fontWeight: '700' }} >Mensaje</Text>
            <Input
              multiline={true}
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
