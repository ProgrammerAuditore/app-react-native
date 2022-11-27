import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { ListItem, Avatar, Card, Input, Text, Button, Badge, Icon, withBadge, FAB } from "@rneui/themed";
import firebase from '../firebase';

const vistListarMensajes = (props) => {

  const [users, setUsers] = useState([]);

  const fetchPosts = async () => {
    try {
      const users = [];
      await firebase.conexion
        .collection('clMensajes')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // Obtener los datos de los registros
            const {
              dataMensaje,
              dataNombre,
              dataFecha,
              dataRemitente,
              dataRemitenteNombre,
              dataDestinatario,
            } = doc.data();

            // Seleccionar solo los elementos de dataCorreo = dataDestinatario 
            if (dataDestinatario == props.route.params.paramCorreo) {
              users.push({
                id_firestore: doc.id,
                dataMensaje,
                dataNombre,
                dataFecha,
                dataRemitente,
                dataRemitenteNombre,
                dataDestinatario,
              });
            }
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
      <View style={{ flex: 1, flexDirection: "column" }}>
        {
          users.map((itemUsuario) => {
            return (
              <Card key={itemUsuario.id_firestore}>
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
                      <ListItem.Title>De: {itemUsuario.dataRemitenteNombre}</ListItem.Title>
                      <ListItem.Subtitle style={{ fontSize: 8 }}>{itemUsuario.dataFecha}</ListItem.Subtitle>
                      <ListItem.Subtitle style={{ fontSize: 8 }}>Para: {itemUsuario.dataNombre}</ListItem.Subtitle>
                      <Text>
                        {itemUsuario.dataMensaje}
                      </Text>
                    </ListItem.Content>
                  </ListItem>
                </View>
              </Card>
            );
          })
        }

      </View>
      <View>

      </View>
    </ScrollView>
  )
}

export default vistListarMensajes;

const styles = StyleSheet.create({

});