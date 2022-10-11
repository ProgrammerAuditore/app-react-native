import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Card, Input, Text, Button, Icon, Alert } from '@rneui/base';
import { useState } from 'react';
import firebase from '../firebase';

const visCrearUsuario = (props) => {

  const [state, setState] = useState({
    usuId: "Default",
    usuNombres: "Default",
    usuApellidos: "Default",
    usuEdad: "Default",
    usuTelefono: "Default",
    usuDireccion: "Default",
  });

  const handlerChangeText = (usuNombres, value) => {
    setState({ ...state, [usuNombres]: value });
    console.log(state);
  }

  const guardarNuevoUsuario = async () => {
    if (state.usuId === '' || state.usuNombres === '') {
      alert('Ingrese el campo Id o Nombres');
    } else {
      await firebase.conexion
        .collection('bdMonitoreo')
        .add({
          usuId: state.usuId,
          usuNombres: state.usuNombres,
          usuApellidos: state.usuApellidos,
          usuEdad: state.usuEdad,
          usuTelefono: state.usuTelefono,
          usuDireccion: state.usuDireccion,
        });
      alert('Usuario creado exitosamente.');
      props.navigation.navigate('vistListaUsuario');
    }
  }

  return (
    <ScrollView>
      <View>
        <Button
          onPress={() => props.navigation.navigate("vistListaUsuario")}
          type="solid">
          Atras
          <Icon name="home" color="white" />
        </Button>
      </View>
      <View style={{ flex: 1, flexDirection: "column" }}>
        <Card>
          <Card.Title>Crear usuario</Card.Title>
          <Card.Divider></Card.Divider>

          {/* Campo: ID */}
          <View>
            <Text>ID</Text>
            <Input
              onChangeText={(Valor) => handlerChangeText('usuId', Valor)}
              placeholder='Ingresar ID'
            ></Input>
          </View>

          {/* Campo: Nombres */}
          <View>
            <Text>Nombres</Text>
            <Input
              onChangeText={(Valor) => handlerChangeText('usuNombres', Valor)}
              placeholder='Ingresar nombres'
            ></Input>
          </View>

          {/* Campo: Apellidos */}
          <View>
            <Text>Apellidos</Text>
            <Input
              onChangeText={(Valor) => handlerChangeText('usuApellidos', Valor)}
              placeholder='Ingresar apellidos'
            ></Input>
          </View>

          {/* Campo: Edad */}
          <View>
            <Text>Edad</Text>
            <Input
              onChangeText={(Valor) => handlerChangeText('usuEdad', Valor)}
              placeholder='Ingresar edad'
            ></Input>
          </View>

          {/* Campo: Telefono */}
          <View>
            <Text>Telefono</Text>
            <Input
              onChangeText={(Valor) => handlerChangeText('usuTelefono', Valor)}
              placeholder='Ingresar telefono'
            ></Input>
          </View>

          {/* Campo: Direccion */}
          <View>
            <Text>Direccion</Text>
            <Input
              onChangeText={(Valor) => handlerChangeText('usuDireccion', Valor)}
              placeholder='Ingresar telefono'
            ></Input>
          </View>

          {/* Botón : Crear usuario */}
          <Button
            title="Crear usuario"
            buttonStyle={{ backgroundColor: 'rgba(111, 202, 186, 1)' }}
            containerStyle={{
              marginVertical: 5,
              borderRadius: 5,
            }}
            titleStyle={{ color: 'white', marginHorizontal: 20 }}
            onPress={() => guardarNuevoUsuario()}
          />

        </Card>
      </View>

    </ScrollView>
  );
}

export default visCrearUsuario;

const styles = StyleSheet.create({});
