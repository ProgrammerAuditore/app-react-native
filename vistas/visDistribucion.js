import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'

const visDistribucion = (props) => {
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

export default visDistribucion

const styles = StyleSheet.create({})