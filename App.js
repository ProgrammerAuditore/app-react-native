import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import visPrincipal from './vistas/visPrincipal';
import visCrearUsuario from './vistas/visCrearUsuario';
import visDetalleUsuario from './vistas/visDetalleUsuario';
import vistListaUsuario from './vistas/vistListaUsuario';
import visDistribucion from './vistas/visDistribucion';


function MyStack(){
    return (
        <Stack.Navigator>
            <Stack.Screen name='visDistribucion' component={visDistribucion} options={{title:'App Maximo'}} />
            <Stack.Screen name='visPrincipal' component={visPrincipal} options={{title:'App Maximo'}} />
            <Stack.Screen name='visCrearUsuario' component={visCrearUsuario} options={{title:'App Maximo'}} />
            <Stack.Screen name='visDetalleUsuario' component={visDetalleUsuario} options={{title:'App Maximo'}} />
            <Stack.Screen name='vistListaUsuario' component={vistListaUsuario} options={{title:'App Maximo'}} />
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
