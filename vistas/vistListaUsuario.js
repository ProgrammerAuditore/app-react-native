import { StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

const vistListaUsuario = (props) => {
  return (
    <ScrollView>
    <View>
      <Text>vistListaUsuario</Text>
    </View>
    <View>
        <Button 
        title="Volver" 
        onPress={() => props.navigation.navigate('visPrincipal')} />
      </View>
    </ScrollView>
  )
}

export default vistListaUsuario;

const styles = StyleSheet.create({

});