import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { ListItem, Avatar, Button, Text } from "@rneui/themed";

const list = [
  {
    nombre: 'Amy Farha',
    avatar_url: 'https://cdn-icons-png.flaticon.com/512/168/168734.png',
    subtitulo: 'Vice President',
    estado: 'Disponible 😅'
  },
  {
    nombre: 'Chris Jackson',
    avatar_url: 'https://cdn-icons-png.flaticon.com/512/147/147144.png',
    subtitulo: 'Vice Chairman',
    estado: 'Ocupado 😅'
  },
  {
    nombre: 'Chris Jackson',
    avatar_url: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
    subtitulo: 'Vice Chairman',
    estado: 'Desarrollando App 😅'
  },
  {
    nombre: 'Chris Jackson',
    avatar_url: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    subtitulo: 'Vice Chairman',
    estado: 'Ocupado 😅'
  }
];

const vistListaUsuario = (props) => {

  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(
      date + '/' + month + '/' + year
      + ' ' + hours + ':' + min + ':' + sec
    );
  }, []);

  return (
    <ScrollView>
      <Button size={"sm"} title="Crear usuario" onPress={() => props.navigation.navigate("visCrearUsuario")}></Button>
      <View>
        {
          list.map((l, i) => (
            <ListItem 
            onPress={() => props.navigation.navigate("visDetalleUsuario")}
            key={i} bottomDivider>
              <Avatar
                size={"large"}
                rounded
                source={{ uri: l.avatar_url }} />
              <ListItem.Content>
                <ListItem.Title>{l.nombre} #{i}</ListItem.Title>
                <ListItem.Subtitle>{l.subtitulo}</ListItem.Subtitle>
                <Text>{currentDate}</Text>
              </ListItem.Content>
            </ListItem>
          ))
        }
      </View>
    </ScrollView>
  )
}

export default vistListaUsuario;

const styles = StyleSheet.create({

});