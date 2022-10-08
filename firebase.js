import  'firebase/firestore'

// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "AIzaSyDH-rR1QIjet-tsDySoVarRQ4SHb54ww4k",
    authDomain: "appgeolocalizacion-ee271.firebaseapp.com",
    databaseURL: "https://appgeolocalizacion-ee271-default-rtdb.firebaseio.com",
    projectId: "appgeolocalizacion-ee271",
    storageBucket: "appgeolocalizacion-ee271.appspot.com",
    messagingSenderId: "1029802926761",
    appId: "1:1029802926761:web:9ac84770cf0a682a7fbfb8"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

const conexion = firebase.firestore()
export default {
    firebase,
    conexion,
}