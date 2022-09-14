import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Card, Input, Text, Button } from '@rneui/base';

const visCrearUsuario = (props) => {
  return (
      <ScrollView>
        <View  style={{ flex: 1, flexDirection: "column"}}>
          <Card>
            <Card.Title>Crear usuario</Card.Title>
            <Card.Divider></Card.Divider>
            
            {/* Campo: Nombre */}
            <View>
              <Text>Nombre</Text>
              <Input 
              placeholder='Ingresar nombre'
              ></Input>
            </View>

            {/* Campo: Edad */}
            <View>
              <Text>Edad</Text>
              <Input 
              placeholder='Ingresar edad'
              ></Input>
            </View>

            {/* Campo: Apellidos */}
            <View>

              <Text>Apellidos</Text>
              <Input 
              placeholder='Ingresar apellidos'
              ></Input>
            </View>

            {/* Campo: Dirección */}
            <View>
              <Text>Dirección</Text>
              <Input 
              placeholder='Ingresar dirección'
              ></Input>
            </View>

            {/* Botón */}
            <Button size={"sm"} title="Crear usuario" onPress={() => props.navigation.navigate("vistListaUsuario")}></Button>

          </Card>
        </View>
        
      </ScrollView>
  );
}

export default visCrearUsuario;

const styles = StyleSheet.create({});
