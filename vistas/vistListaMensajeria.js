import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { ListItem, Avatar, Button, Text, Badge, Icon, withBadge } from "@rneui/themed";
import firebase from '../firebase';

const vistListaMensajeria = (props) => {

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
              dataNombre,
              dataFecha,
            } = doc.data();
            users.push({
              id_firestore: doc.id,
              dataLongitude,
              dataLatitude,
              dataCorreo,
              dataNombre,
              dataFecha,
            });
          });
        });
      setUsers(users);
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

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
      <View>
        {
          users.map((itemUsuario) => {
            return (
              <ListItem key={itemUsuario.id_firestore}
                bottomDivider
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
                  <ListItem.Title>{itemUsuario.dataNombre}</ListItem.Title>
                  <ListItem.Subtitle style={{ fontSize: 8 }}>{itemUsuario.dataFecha}</ListItem.Subtitle>
                  <ListItem.Subtitle style={{ fontSize: 8 }}>{itemUsuario.dataCorreo}</ListItem.Subtitle>
                  <View
                    style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}
                  >
                    <Button
                      onPress={() => props.navigation.navigate("visCrearMensaje", { paramId: itemUsuario.id_firestore })}
                      type="solid">
                      <Icon name="send" size={15} color="white" />
                    </Button>
                    <Button
                      onPress={() => props.navigation.navigate("vistListarMensajes",
                        { paramCorreo: itemUsuario.dataCorreo }
                      )}
                      type="solid">
                      <Icon name="message" size={15} color="white" />
                    </Button>
                  </View>
                </ListItem.Content>
              </ListItem>
            );
          })
        }
      </View>
    </ScrollView>
  )
}

export default vistListaMensajeria;

const styles = StyleSheet.create({

});