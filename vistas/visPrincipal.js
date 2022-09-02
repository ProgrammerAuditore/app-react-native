import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

const visPrincipal = (props) => {
  return (
    <ScrollView>
      <View style={styles.container}>
      <Text>Hola mundo, desde react-native.</Text>
      </View>
      <View>
        <Button 
        title="Ir a vista distribucción" 
        onPress={() => props.navigation.navigate('visDistribucion')} />
      </View>
    </ScrollView>
  );
}

export default visPrincipal;

const styles = StyleSheet.create({
  
});
