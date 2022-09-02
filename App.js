import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import visPrincipal from './vistas/visPrincipal';
import visCrearUsuario from './vistas/visCrearUsuario';


function MyStack(){
    return (
        <Stack.Navigator>
            <Stack.Screen name='visPrincipal' component={visPrincipal} options={{title:'App Maximo'}} />
            <Stack.Screen name='visCrearUsuario' component={visCrearUsuario} options={{title:'App Maximo'}} />
        </Stack.Navigator>
    );
}

function App(){
    return(
        <NavigationContainer> 
            <MyStack></MyStack> 
        </NavigationContainer>
    );
}

const styles=StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center'
    }
});

export default App;
