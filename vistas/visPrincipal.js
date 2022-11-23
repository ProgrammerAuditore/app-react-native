import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Input, Text, Button, Icon } from '@rneui/base';
import firebase from '../firebase';
const auth = firebase.auth;

const visPrincipal = (props) => {

  const fncCerrarSesion = async () => {
    await auth.signOut().then(() => {
      { props.navigation.navigate("vistLogIn") }
    })
      .catch(error => alert(error.message));
  }

  return (
    <ScrollView>
      <View style={{ flex: 1, flexDirection: "column" }}>
        <Card>
          <Card.Title>Menú principal</Card.Title>
          <Card.Divider></Card.Divider>

          {/* Usuarios */}
          <Button
            title="Usuarios"
            icon={{
              name: 'caret-down',
              type: 'font-awesome',
              size: 45,
              color: 'white',
            }}
            iconContainerStyle={{ marginRight: 10 }}
            titleStyle={{ fontWeight: '700' }}
            buttonStyle={{
              backgroundColor: 'rgba(111, 202, 186, 1)',
              borderColor: 'transparent',
              borderWidth: 0,
              borderRadius: 30,
            }}
            containerStyle={{
              marginVertical: 5,
              borderRadius: 5,
            }}
            onPress={() => props.navigation.navigate('vistListaUsuario')} 
          />

          {/* Usuarios */}
          <Button
            title="Monitoreo"
            icon={{
              name: 'caret-down',
              type: 'font-awesome',
              size: 45,
              color: 'white',
            }}
            iconContainerStyle={{ marginRight: 10 }}
            titleStyle={{ fontWeight: '700' }}
            buttonStyle={{
              backgroundColor: 'rgba(111, 202, 186, 1)',
              borderColor: 'transparent',
              borderWidth: 0,
              borderRadius: 30,
            }}
            containerStyle={{
              marginVertical: 5,
              borderRadius: 5,
            }}
          />

          {/*  Cerrar Sesión */}
          <Button
            buttonStyle={{
              borderRadius: 30,
              backgroundColor: 'red'
            }}
            containerStyle={{
              marginVertical: 5,
              borderRadius: 5,
            }}
            type="solid"
            onPress={() => fncCerrarSesion()}
          >
            <Icon name="exit-to-app" color="white" />
            Cerrar sesión
          </Button>

        </Card>
      </View>

    </ScrollView>
  );
}

export default visPrincipal;

const styles = StyleSheet.create({
  contentView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'green',
    padding: 20,
    color: 'red'
  },
  innerText: {
    color: 'white',
    fontSize: 20,
    alignContent: 'center',
    textAlign: 'center',
  }
});
