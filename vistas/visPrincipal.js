import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

const visPrincipal = (props) => {
  return (
    <ScrollView>
      <View style={styles.container}>
      <Text style={styles.innerText}>Hola mundo, desde react-native.</Text>
      </View>
      <View>
        <Button 
        title="Ir a vista distribucción" 
        onPress={() => props.navigation.navigate('visDistribucion')} />
      </View>
      <View>
        <Button 
        title="Ir a vista usuario" 
        onPress={() => props.navigation.navigate('vistListaUsuario')} />
      </View>
      <View>
        <Button 
        title="Crear usuario" 
        onPress={() => props.navigation.navigate('visCrearUsuario')} />
      </View>
      <View>
        <Button 
        title="Mis Datos" 
        onPress={() => props.navigation.navigate('visDatos')} />
      </View>
      <View>
        <Button 
        title="Login" 
        onPress={() => props.navigation.navigate('visLogin')} />
      </View>
    </ScrollView>
  );
}

export default visPrincipal;

const styles = StyleSheet.create({
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
