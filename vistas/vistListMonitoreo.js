import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { ListItem, Avatar, Button, Text, Badge, Icon, withBadge } from "@rneui/themed";
import firebase from '../firebase';

const vistMonitoreo = (props) => {

    const [users, setUsers] = useState([]);

    const fetchPosts = async () => {
        try {
            const users = [];
            await firebase.conexion
                .collection('bdMonitoreo')
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        const {
                            dataLongitude,
                            dataLatitude,
                            dataCorreo,
                            dataNombre,
                        } = doc.data();
                        users.push({
                            id_firestore: doc.id,
                            dataLongitude,
                            dataLatitude,
                            dataCorreo,
                            dataNombre,
                        });
                    });
                });
            setUsers(users);
        } catch (e) {
            alert(e);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <ScrollView>
            {/* <Button size={"sm"} title="Crear usuario" onPress={() => props.navigation.navigate("visCrearUsuario")}></Button> */}
            <Button
                title="Refrescar"
                icon={{
                    name: 'refresh',
                    size: 24,
                    color: 'white',
                }}
                iconContainerStyle={{ marginRight: 10 }}
                titleStyle={{ fontWeight: '700' }}
                buttonStyle={{
                    backgroundColor: 'rgba(0, 102, 132, 1)',
                    borderColor: 'transparent',
                }}
                onPress={() => fetchPosts()} />
            <View>
                {
                    users.map((itemUsuario) => {
                        return (
                            <ListItem key={itemUsuario.id_firestore}
                                bottomDivider
                                // onPress= {()=> alert("Su Id es: "+itemUsuario.id)}
                                onPress={() => props.navigation.navigate('visMapa', {
                                    nombreCliente: itemUsuario.dataNombre,
                                    longitude: itemUsuario.dataLongitude,
                                    latitude: itemUsuario.dataLatitude,
                                })
                                }
                            >
                                <ListItem.Chevron />
                                <View>
                                    <Avatar
                                        rounded title="usr"
                                        size="large"
                                        source={{
                                            uri: 'https://randomuser.me/api/portraits/men/36.jpg',
                                        }}
                                    />
                                </View>
                                <ListItem.Content>
                                    <ListItem.Title>{itemUsuario.dataCorreo}</ListItem.Title>
                                    <ListItem.Subtitle>Longitude : {itemUsuario.dataLongitude}</ListItem.Subtitle>
                                    <ListItem.Subtitle>Latitude : {itemUsuario.dataLatitude}</ListItem.Subtitle>
                                </ListItem.Content>
                            </ListItem>
                        );
                    })
                }
            </View>
        </ScrollView >
    )
}

export default vistMonitoreo;

const styles = StyleSheet.create({

});