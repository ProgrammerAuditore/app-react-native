import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { ListItem, Avatar, Button, Text, Badge, Icon, withBadge } from "@rneui/themed";
import firebase from '../firebase';

const vistListaUsuario = (props) => {

  const [users, setUsers] = useState([]);

  const fetchPosts = async () => {
    try {
      const users = [];
      await firebase.conexion
        .collection('bdMonitoreo')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const {
              usuId,
              usuNombres,
              usuApellidos,
              usuEdad,
              usuDireccion,
              usuTelefono,
            } = doc.data();
            users.push({
              id_firestore: doc.id,
              usuId,
              usuNombres,
              usuApellidos,
              usuEdad,
              usuDireccion,
              usuTelefono,
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
      <Button size={"sm"} title="Crear usuario" onPress={() => props.navigation.navigate("visCrearUsuario")}></Button>
      <View>
        {
          users.map((itemUsuario) => {
            return (
              <ListItem key={itemUsuario.id_firestore}
                bottomDivider
              // onPress= {()=> alert("Su Id es: "+itemUsuario.id)}
              onPress= {()=> props.navigation.navigate('visDetalleUsuario', {
                paramId: itemUsuario.id_firestore,
                })
              }
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
                <Badge
                  status="primary"
                  value={itemUsuario.usuEdad}
                  containerStyle={{ position: 'absolute', top: 5, left: 60 }}
                />
                </View>
                <ListItem.Content>
                  <ListItem.Title>{itemUsuario.usuNombres} {itemUsuario.usuApellidos}</ListItem.Title>
                  <ListItem.Subtitle>{itemUsuario.usuId}</ListItem.Subtitle>
                  <ListItem.Subtitle>{itemUsuario.usuDireccion}</ListItem.Subtitle>
                  <Text>{itemUsuario.usuTelefono}</Text>

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