import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Card, Input, Text, Button, Icon, Alert, ListItem, Avatar } from '@rneui/base';
import firebase from '../firebase';

const visCrearMensaje = (props) => {

  const [state, setState] = useState({
    dataDestinatarioNombre: "Default",
    dataDestinatario: "Default",
    dataRemitenteNombre: "Victor J.",
    dataRemitente: "victor@example.com",
    dataMensaje: "Default",
    dataFecha: "Default",
  });

  const handlerChangeText = (element, value) => {
    setState({ ...state, [element]: value });
    console.log(state);
  }

  const fncObtenerFecha = () => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    return (
      date + '/' + month + '/' + year
      + ' ' + hours + ':' + min + ':' + sec
    );
  }

  const fncEnviarMensaje = async () => {
    if (state.dataMensaje === '' || state.dataDestinatario === '') {
      alert('Ingrese el campo Id o Nombres');
    } else {
      await firebase.conexion
        .collection('clMensajes')
        .add({
          dataDestinatarioNombre: state.dataDestinatarioNombre,
          dataDestinatario: state.dataDestinatario,
          dataRemitenteNombre: state.dataRemitenteNombre,
          dataRemitente: state.dataRemitente,
          dataMensaje: state.dataMensaje,
          dataFecha: state.dataFecha,
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
          // * Obtener campo dataCorreo, dataNombre y Documento ID
          // * de la colección de clUsuarios
          if (documentSnapshot.exists) {
            setState({
              ...state,
              idDocumento: Id,
              dataFecha: fncObtenerFecha(),
              dataDestinatario: documentSnapshot.data().dataCorreo,
              dataDestinatarioNombre: documentSnapshot.data().dataNombre,
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
                {/* <ListItem.Title>{itemUsuario.dataDestinatario}</ListItem.Title> */}
                <ListItem.Subtitle>{state.dataDestinatario}</ListItem.Subtitle>
                <ListItem.Subtitle>{state.dataDestinatarioNombre}</ListItem.Subtitle>
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
