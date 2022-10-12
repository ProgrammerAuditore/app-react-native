import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { ListItem, Avatar, Button, Text } from "@rneui/themed";
import firebase from '../firebase';

const vistListaUsuario = (props) => {

  const [users,setUsers] = useState([]);

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
            } = doc.data();
            users.push({
              id: doc.id,
              usuId,
              usuNombres,
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
          users.map((user) => {
            return (
             <ListItem  key={user.id} 
             bottomDivider 
             //onPress= {()=> alert("Su Id es: "+user.id)}
             // onPress= {()=> props.navigation.navigate('UserDetailScreen', {
             //   userId: user.id,
             //   userName: user.name,
             //   userMail: user.mail,
             //   userPhone: user.phone, 
             //   } ) }
            >  
               <ListItem.Chevron />
               <Avatar
                   rounded title ="usr"
                   size="large"
                   source={{uri:'https://randomuser.me/api/portraits/men/36.jpg',
                   }}
             />
               <ListItem.Content>
                    <ListItem.Title>{user.usuId}</ListItem.Title>
                    <ListItem.Subtitle>{user.usuNombres}</ListItem.Subtitle>
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