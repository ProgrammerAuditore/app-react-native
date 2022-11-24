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
              dataLatitude,
              dataLongitude,
              dataCorreo,
            } = doc.data();
            users.push({
              id_firestore: doc.id,
              dataLatitude,
              dataLongitude,
              dataCorreo,
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
      <Button size={"sm"} title="Refresar" onPress={() => fetchPosts()}></Button>
      <View>
        {
          users.map((itemUsuario) => {
            return (
              <ListItem key={itemUsuario.id_firestore}
                bottomDivider
                // onPress= {()=> alert("Su Id es: "+itemUsuario.id)}
                onPress={() => props.navigation.navigate('visDetalleUsuario', {
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
                </View>
                <ListItem.Content>
                  <ListItem.Title>{itemUsuario.dataCorreo}</ListItem.Title>
                  <ListItem.Subtitle>{itemUsuario.dataLatitude}</ListItem.Subtitle>
                  <ListItem.Subtitle>{itemUsuario.dataLongitude}</ListItem.Subtitle>
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