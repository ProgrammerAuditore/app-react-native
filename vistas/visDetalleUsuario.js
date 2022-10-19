import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Card, Input, Text, Button, Icon } from '@rneui/base';
import firebase from '../firebase';

const visDetalleUsuario = (props) => {

  const [user, setUser] = useState({
    idFirestore: "",
    usuId: "Default",
    usuNombres: "Default",
    usuApellidos: "Default",
    usuEdad: "Default",
    usuTelefono: "Default",
    usuDireccion: "Default",
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
              usuId: documentSnapshot.data().usuId,
              usuNombres: documentSnapshot.data().usuNombres,
              usuApellidos: documentSnapshot.data().usuApellidos,
              usuEdad: documentSnapshot.data().usuEdad,
              usuTelefono: documentSnapshot.data().usuTelefono,
              usuDireccion: documentSnapshot.data().usuDireccion,
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
          usuId: user.usuId,
          usuNombres: user.usuNombres,
          usuApellidos: user.usuApellidos,
          usuEdad: user.usuEdad,
          usuTelefono: user.usuTelefono,
          usuDireccion: user.usuDireccion,
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

  useEffect(() => {
    getUserById(props.route.params.paramId);
  }, []);

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
          <Card.Title>Detalles del usuario</Card.Title>
          <Card.Divider></Card.Divider>

          {/* Campo: ID */}
          <View>
            <Text>ID</Text>
            <Input
              placeholder='Ingresar ID'
              value={user.usuId}
              onChangeText={(Valor) => handlerChangeText('usuId', Valor)}
            ></Input>
          </View>

          {/* Campo: Nombres */}
          <View>
            <Text>Nombres</Text>
            <Input
              value={user.usuNombres}
              onChangeText={(Valor) => handlerChangeText('usuNombres', Valor)}
              placeholder='Ingresar nombres'
            ></Input>
          </View>

          {/* Campo: Apellidos */}
          <View>
            <Text>Apellidos</Text>
            <Input
              value={user.usuApellidos}
              onChangeText={(Valor) => handlerChangeText('usuApellidos', Valor)}
              placeholder='Ingresar apellidos'
            ></Input>
          </View>

          {/* Campo: Edad */}
          <View>
            <Text>Edad</Text>
            <Input
              value={user.usuEdad}
              onChangeText={(Valor) => handlerChangeText('usuEdad', Valor)}
              placeholder='Ingresar edad'
            ></Input>
          </View>

          {/* Campo: Telefono */}
          <View>
            <Text>Telefono</Text>
            <Input
              value={user.usuTelefono}
              onChangeText={(Valor) => handlerChangeText('usuTelefono', Valor)}
              placeholder='Ingresar telefono'
            ></Input>
          </View>

          {/* Campo: Direccion */}
          <View>
            <Text>Direccion</Text>
            <Input
              value={user.usuDireccion}
              onChangeText={(Valor) => handlerChangeText('usuDireccion', Valor)}
              placeholder='Ingresar telefono'
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
            onPress={() => props.navigation.navigate("vistListaUsuario")}
          />

        </Card>
      </View>

    </ScrollView>
  )
}

export default visDetalleUsuario

const styles = StyleSheet.create({})
