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
import MenuPrincipal from './vistas/MenuPrincipal';
import visDatos from './vistas/visDatos';
import visMapa from './vistas/visMapa';
import vistLogIn from './vistas/vistLogIn';
import vistListMonitoreo from './vistas/vistListMonitoreo';


function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='vistLogIn' component={vistLogIn} options={{ title: 'App Administrador' }} />
            <Stack.Screen name='visPrincipal' component={visPrincipal} 
            options={{
                headerLeft: ()=> null,
                title: 'App Administrador'
            }}  />
            <Stack.Screen name='visDetalleUsuario' component={visDetalleUsuario} options={{ title: 'App Administrador' }} />
            <Stack.Screen name='visCrearUsuario' component={visCrearUsuario} options={{ title: 'App Administrador' }} />
            <Stack.Screen name='vistListaUsuario' component={vistListaUsuario} options={{ title: 'App Administrador' }} />
            <Stack.Screen name='visDistribucion' component={visDistribucion} options={{ title: 'App Administrador' }} />
            <Stack.Screen name='MenuPrincipal' component={MenuPrincipal} />
            <Stack.Screen name='visDatos' component={visDatos} options={{ title: 'App Administrador' }} />
            <Stack.Screen name='visMapa' component={visMapa} options={{ title: 'App Administrador' }} />
            <Stack.Screen name='vistListMonitoreo' component={vistListMonitoreo} options={{ title: 'App Administrador' }} />
        </Stack.Navigator>
    );
}

function App() {
    return (
        <NavigationContainer>
            <MyStack></MyStack>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default App;
