import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { ListItem, Avatar, Button, Text, Badge, Icon, withBadge } from "@rneui/themed";
import { useIsFocused } from '@react-navigation/native';
import firebase from '../firebase';

const vistListaUsuario = (props) => {

  const isFocused = useIsFocused();

  const [users, setUsers] = useState([]);

  const fetchPosts = async () => {
    try {
      const users = [];
      await firebase.conexion
        .collection('clUsuarios')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const {
              dataLongitude,
              dataLatitude,
              dataCorreo,
            } = doc.data();
            users.push({
              id_firestore: doc.id,
              dataLongitude,
              dataLatitude,
              dataCorreo,
            });
          });
        });
      setUsers(users);
    } catch (e) {
      alert(e);
    }
  };

  const fncIrA = (snapshot) => {
    const btn = props.route.params.boton;
    let vista = '';
    switch (btn) {
      case 'btnUsuarios': vista = "visDetalleUsuario"; break;
      case 'btnMensajeria': vista = "visCrearMensaje"; break;
    }
    props.navigation.navigate(vista, { paramId: snapshot.id_firestore });
  }

  useEffect(() => {
    if (isFocused) {
      fetchPosts();
    }
  }, [isFocused]);

  return (
    <ScrollView>
      {/* <Button size={"sm"} title="Crear usuario" onPress={() => props.navigation.navigate("visCrearUsuario")}></Button> */}
      <Button
        title="Refrescar"
        icon={{
          name: 'refresh',
          size: 24,
          color: 'white',
        }}
        iconContainerStyle={{ marginRight: 10 }}
        titleStyle={{ fontWeight: '700' }}
        buttonStyle={{
          backgroundColor: 'rgba(0, 102, 132, 1)',
          borderColor: 'transparent',
        }}
        onPress={() => fetchPosts()} />
      <Button
        title="Crear usuario"
        icon={{
          name: 'add',
          size: 24,
          color: 'white',
        }}
        iconContainerStyle={{ marginRight: 10 }}
        titleStyle={{ fontWeight: '700' }}
        buttonStyle={{
          backgroundColor: 'rgba(111, 202, 186, 1)',
          borderColor: 'transparent',
        }}
        onPress={() => props.navigation.navigate("visCrearUsuario")} />
      <View>
        {
          users.map((itemUsuario) => {
            return (
              <ListItem key={itemUsuario.id_firestore}
                bottomDivider
                onPress={() => fncIrA(itemUsuario)}
              >
                <ListItem.Chevron />
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
                  <ListItem.Title>{itemUsuario.dataCorreo}</ListItem.Title>
                  <ListItem.Subtitle>Longitude : {itemUsuario.dataLongitude}</ListItem.Subtitle>
                  <ListItem.Subtitle>Latitude : {itemUsuario.dataLatitude}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            );
          })
        }
      </View>
    </ScrollView>
  )
}

export default vistListaUsuario;

const styles = StyleSheet.create({

});