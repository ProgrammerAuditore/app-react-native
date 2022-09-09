import { Button, StyleSheet, Text, View, Alert } from 'react-native';
import React from 'react';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

const visDistribucion = (props) => {
  return (
    <View style={[styles.container, {flexDirection: "column"}]}>
      <View style={{flex:1, flexDirection: "row", backgroundColor: "green", padding: 10}}>
        <View style={{ flex: 1, backgroundColor: "darkgray", padding: 10 }}></View>
        <View style={{ flex: 1, backgroundColor: "tomato", padding: 10}}></View>
      </View>
      {/* Columna 1 */}
      <View style={{ flex: 3, backgroundColor: "darkorange", flexDirection: "column"}}>
          <Text style={styles.textos}>Texto aquí</Text>
          <Text style={styles.textos}>Texto aquí</Text>
          <View>
            <Button title='Da click' style={styles.botonColumn}
            onPress={()=> Alert.alert('Boton presionado')}
            >
            </Button>
          </View>
          <View>
            <Button title='Da click' style={styles.botonColumn}
            onPress={()=> Alert.alert('Boton presionado')}
            >
            </Button>
          </View>
      </View>
      {/* Columna 2 */}
      <View style={{ flex: 2, backgroundColor: "darkorange", flexDirection: "row"}}>
          <View>
            <Button title='Da click' style={styles.botonColumn}
            onPress={()=> Alert.alert('Boton presionado')}
            >
            </Button>
          </View>
          <View>
            <Button title='Da click' style={styles.botonColumn}
            onPress={()=> Alert.alert('Boton presionado')}
            >
            </Button>
          </View>
          <View>
            <Button title='Da click' style={styles.botonColumn}
            onPress={()=> Alert.alert('Boton presionado')}
            >
            </Button>
          </View>
      </View>
      {/* Columna 3 */}
      <View style={{flex: 1, backgroundColor: 'dark', flexDirection:"column"}}>
        <View style={{flex:1, width: 82+'%', flexDirection: "row"}}>
          <Text style={{fontSize: 20, textAlign: "center"}}>Usuario</Text>
          <TextInput style={styles.inputText} placeholder="Escribe un usuario"></TextInput>
        </View>
        <View style={{flex:1, width: 82+'%', flexDirection: "row"}}>
          <Text style={{fontSize: 20, textAlign: "center"}}>Contraseña</Text>
          <TextInput style={styles.inputText} placeholder="Escribe un usuario"></TextInput>
        </View>
      </View>
    </View>
  )
}

export default visDistribucion


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 10,
    backgroundColor: 'white'
  },
  textos: {
    flex:1,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 40
  },
  botonColumn:{
    flex:1,
    color: '#f194ff',
    backgroundColor: 'blue'
  },
  botonRow:{
    flex:1,
    color: '#f194ff',
    padding: 10,
    backgroundColor: 'dark'
  },
  inputText: {
    height:50,
    width: 100+'%', 
    padding:10, 
    borderWidth: 1, 
    borderRadius: 5,
    borderColor: '#c3c3c3',
    backgroundColor: '#fff'
  }
});
