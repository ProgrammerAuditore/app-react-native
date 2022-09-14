import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Card, Input, Text, Button, Icon } from '@rneui/base';

const visCrearUsuario = (props) => {
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

          {/* Botón : Crear usuario */}
          <Button
              title="Crear usuario"
              buttonStyle={{ backgroundColor: 'rgba(111, 202, 186, 1)' }}
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
  );
}

export default visCrearUsuario;

const styles = StyleSheet.create({});
