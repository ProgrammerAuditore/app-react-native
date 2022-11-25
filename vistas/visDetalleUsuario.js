import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Alert } from 'react-native';
import { Card, Input, Text, Button, Icon } from '@rneui/base';
import firebase from '../firebase';

const visDetalleUsuario = (props) => {

  const [user, setUser] = useState({
    idFirestore: "",
    dataCorreo: "Default",
    dataLongitude: "Default",
    dataLatitude: "Default",
  });

  const handlerChangeText = (usuNombre, value) => {
    setUser({ ...user, [usuNombre]: value })
  }

  const getUserById = async (Id) => {
    try {
      await firebase.conexion
        .collection('bdMonitoreo')
        .doc(Id)
        .get()
        .then((documentSnapshot) => {
          if (documentSnapshot.exists) {
            setUser({
              ...user,
              idFirestore: Id,
              dataCorreo: documentSnapshot.data().dataCorreo,
              dataLongitude: documentSnapshot.data().dataLongitude,
              dataLatitude: documentSnapshot.data().dataLatitude,
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

  const mtdActualizarUsuario = async (id) => {
    try {
      await firebase.conexion
        .collection('bdMonitoreo')
        .doc(id)
        .update({
          dataCorreo: user.dataCorreo,
          dataLongitude: user.dataLongitude,
          dataLatitude: user.dataLatitude,
        })
        .then(() => {
          alert('Usuario Actualizado!');
          props.navigation.navigate("visPrincipal");
        });
      //setUsers(users);
    } catch (e) {
      alert(e);
    }

  };

  const confirmarEliminacion = () => {
    Alert.alert('Eliminando Usuario', '¿Está seguro que desea eliminar?',
      [{ text: 'Si', onPress: () => mtdEliminarUsuario(user.idFirestore) },
      { text: 'No', onPress: () => alert("Cancelado") }
      ]);
  }

  const mtdEliminarUsuario = async (id) => {
    try {
      const users = [];
      await firebase.conexion
        .collection('bdMonitoreo')
        .doc(id)
        .delete()
        .then(() => {
          alert('Usuario Eliminado!');
          props.navigation.navigate('visPrincipal');
        });
      //setUsers(users);
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
          <Card.Title>Detalles del usuario</Card.Title>
          <Card.Divider></Card.Divider>

          {/* Campo: Correo */}
          <View>
            <Text>Correo</Text>
            <Input
              value={user.dataCorreo}
              onChangeText={(Valor) => handlerChangeText('dataCorreo', Valor)}
              placeholder='Ingresar correo'
            ></Input>
          </View>

          {/* Campo: Longitude */}
          <View>
            <Text>Longitude</Text>
            <Input
              value={user.dataLongitude}
              onChangeText={(Valor) => handlerChangeText('dataLongitude', Valor)}
              placeholder='Ingresar longitude'
            ></Input>
          </View>

          {/* Campo: Latitude */}
          <View>
            <Text>Latitude</Text>
            <Input
              value={user.dataLatitude}
              onChangeText={(Valor) => handlerChangeText('dataLatitude', Valor)}
              placeholder='Ingresar latitude'
            ></Input>
          </View>

          {/* Botón : Actualizar */}
          <Button
            title="Actualizar"
            buttonStyle={{ backgroundColor: 'rgba(255, 193, 7, 1)' }}
            containerStyle={{
              marginVertical: 5,
              borderRadius: 5,
            }}
            titleStyle={{ color: 'white', marginHorizontal: 20 }}
            onPress={() => mtdActualizarUsuario(user.idFirestore)}
          />

          {/* Botón : Eliminar */}
          <Button
            title="Eliminar"
            buttonStyle={{ backgroundColor: 'rgba(214, 61, 57, 1)' }}
            containerStyle={{
              marginVertical: 5,
              borderRadius: 5,
            }}
            titleStyle={{ color: 'white', marginHorizontal: 20 }}
            onPress={() => confirmarEliminacion()}
          />

        </Card>
      </View>

    </ScrollView>
  )
}

export default visDetalleUsuario

const styles = StyleSheet.create({})
