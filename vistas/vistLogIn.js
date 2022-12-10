import React from 'react';
import { StyleSheet, ScrollView, View, Alert } from 'react-native';
import { Card, Input, Text, Button, Icon } from '@rneui/base';
import { useState } from 'react';
import firebase from '../firebase';
import { useEffect } from 'react';
const auth = firebase.auth;

const vistLogIn = (props) => {

    const [state, setState] = useState({
        usuId: "Default",
        usuPassword: "Default",
        usuCorreo: "Default",
    });

    const handlerChangeText = (usuNombres, value) => {
        setState({ ...state, [usuNombres]: value });
        console.log(state);
    }

    const fncEntrar = async () => {
        if (state.usuCorreo === '' || state.usuPassword === '') {
            alert('Ingrese campos validos');
        } else {
            await auth.signInWithEmailAndPassword(state.usuCorreo, state.usuPassword)
                .then(userCredentials => {
                    const user = userCredentials.user;
                    console.log('Logged in with:', user.email);
                    { props.navigation.navigate("visPrincipal") }
                })
                .catch(error => alert(error.message));
        }
    }

    const fncRegistrarme = async () => {
        if (state.usuCorreo === '' || state.usuPassword === '') {
            alert('Ingrese campos validos');
        } else {
            await auth.createUserWithEmailAndPassword(state.usuCorreo, state.usuPassword)
                .then(userCredentials => {
                    const user = userCredentials.user;
                    Alert("Usuario registrado exitosamente.");
                    console.log('Registered with:', user.email);
                })
                .catch(error => alert(error.message));
        }
    }

    useEffect(() => {
        setState({
            ...state,
            usuCorreo: "boris@example.com",
            usuPassword: "0000000000",
        });
    }, []);

    return (
        <ScrollView>
            <View style={{ flex: 1, flexDirection: "column" }}>
                <Card>
                    <Card.Title>Iniciar sesión</Card.Title>
                    <Card.Divider></Card.Divider>

                    {/* Campo: Correo eléctronico */}
                    <View>
                        <Text>Correo eléctronico</Text>
                        <Input
                            value={state.usuCorreo}
                            onChangeText={(Valor) => handlerChangeText('usuCorreo', Valor)}
                            placeholder='Ingresar correo eléctronico'
                        ></Input>
                    </View>

                    {/* Campo: Contraseña */}
                    <View>
                        <Text>Contraseña</Text>
                        <Input
                            value={state.usuPassword}
                            onChangeText={(Valor) => handlerChangeText('usuPassword', Valor)}
                            placeholder='Ingresar contraseña'
                            secureTextEntry
                        ></Input>
                    </View>

                    {/* Botón : Entrar */}
                    <Button
                        title="Entrar"
                        buttonStyle={{ backgroundColor: 'rgba(111, 202, 186, 1)' }}
                        containerStyle={{
                            marginVertical: 5,
                            borderRadius: 5,
                        }}
                        titleStyle={{ color: 'white', marginHorizontal: 20 }}
                        onPress={() => fncEntrar()}
                    />

                    {/* Botón : Registrarme */}
                    <Button
                        title="Registrarme"
                        buttonStyle={{ backgroundColor: 'rgba(255, 193, 7, 1)' }}
                        containerStyle={{
                            marginVertical: 5,
                            borderRadius: 5,
                        }}
                        titleStyle={{ color: 'white', marginHorizontal: 20 }}
                        onPress={() => fncRegistrarme()}
                    />

                </Card>
            </View>

        </ScrollView>
    );
}

export default vistLogIn;

const styles = StyleSheet.create({});
