import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Card, Input, Text, Button, Icon, Alert } from '@rneui/base';
import { useState } from 'react';

const visCrearUsuario = (props) => {

  const [state, setState] = useState({
    usuDireccion: "",
    usuId: "",
    usuNombre: "",
    usuTelefono: "",
  });

  const handlerChangeText = (usuNombre, value) => {
    setState({...state, [usuNombre] : value});
  }
  
  const guardarNuevoUsuario = async (usuNombre, value) => {
    if(state.usuId === '' || state.usuNombre === ''){
      alert('Favor de introducir todos los valores');
    } else {
      await Firebase.conexion 
      .collection('usuarios')
      .add(
        {
          usuDireccion: state.usuDireccion,
          usuId : state.usuId,
          usuNombre : state.usuNombre,
          usuTelefono : state.usuTelefono
        }
      );
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

          {/* Campo: Nombre */}
          <View>
            <Text>Nombre</Text>
            <Input
              onChangeText={(Valor) => handlerChangeText('usuNombre', Valor)}
              placeholder='Ingresar nombre'
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

          {/* Campo: Apellidos */}
          <View>

            <Text>Apellidos</Text>
            <Input
              onChangeText={(Valor) => handlerChangeText('usuApellidos', Apellidos)}
              placeholder='Ingresar apellidos'
            ></Input>
          </View>

          {/* Campo: Dirección */}
          <View>
            <Text>Dirección</Text>
            <Input
              onChangeText={(Valor) => handlerChangeText('usuDireccion', usuDireccion)}
              placeholder='Ingresar dirección'
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
              onPress={() => guardarNuevoUsuario}
          />

        </Card>
      </View>

    </ScrollView>
  );
}

export default visCrearUsuario;

const styles = StyleSheet.create({});
