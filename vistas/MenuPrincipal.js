import React from 'react';
import { StyleSheet,Text, View, TouchableOpacity, Image, Alert, ScrollView, FlatList } from 'react-native';

const data = [
    { id: 1, title: "Usuarios", image: "https://img.icons8.com/ios-filled/344/guest-male--v1.png"},
    { id: 2, title: "GPS", image: "https://img.icons8.com/ios-filled/344/guest-male--v1.png"},
    { id: 3, title: "Mapa", image: "https://img.icons8.com/ios-filled/344/guest-male--v1.png"},
    { id: 4, title: "Acerca de", image: "https://img.icons8.com/ios-filled/344/guest-male--v1.png"},
];

const MenuPrincipal = (props) => {

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
        const color = item.id === selectedId ? 'white' : 'black';
    
        return (
          <Item
            item={item}
            renderItem={renderItem}
            onPress={() => setSelectedId(item.id)}
            backgroundColor={{ backgroundColor }}
            textColor={{ color }}
          />
        );
      };

  return (
    <View style={styles.container}>
        <View style={{flex:4}}>
            <FlatList style={StyleSheet.list}
            contentContainerStyle={styles.listContainer}
            data={data}
            horizontal={false}
            numColumns={2}
            keyExtractor={(item) => {   
                return item.id;
            }}
            renderItem = {({item}) => {
              return (<View>
                <TouchableOpacity style={{backgroundColor:'#123123', color:'#cccc'}}
                onPress={ () => {
                  switch(item.id){
                    case 1: 
                      Alert.alert("Enviando la vista de usuarios");
                      props.navigation.navigate("vistListaUsuario");
                      break;
                    case 2: 
                      Alert.alert("Enviando la vista de usuarios");
                      props.navigation.navigate("vistListaUsuario");
                      break;
                      case 3: 
                      Alert.alert("Enviando la vista de usuarios");
                      props.navigation.navigate("vistListaUsuario");
                      break;
                    case 4: 
                      Alert.alert("Enviando la vista de usuarios");
                      props.navigation.navigate("vistListaUsuario");
                      break;
                  }
                }}
                >
                {/* Picture profile  */}
                <Image style={styles.cardImage} source={{uri:item.image}} />
                </TouchableOpacity>

                {/* Card Header */}
                <View style={styles.cardHeader}>
                  <View style={{alignItems:"center", justifyContent:"center"}}>
                    <Text style={styles.title}> {item.title} </Text>
                  </View>
                </View>

              </View>)
            }}
            />
        </View>
    </View>
  )
}

export default MenuPrincipal

const styles = StyleSheet.create({
    container:{
      flex:1,
      marginTop:1,
      backgroundColor:'#f6f6f6',
    },
    list: {
      paddingHorizontal: 5,
      backgroundColor:"#F1F1F1",
    },
    listContainer:{
      alignItems:'center'
    },
    /******** card **************/
    card:{
      shadowColor: '#474747',
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
  
      elevation: 12,
      marginVertical: 12,
      marginHorizontal: 40,
      backgroundColor:"#407FC6",
      //flexBasis: '42%',
      width:80,
      height:80,
      borderRadius:60,
      alignItems:'center',
      justifyContent:'center'
    },
    cardHeader: {
      paddingVertical: 17,
      paddingHorizontal: 16,
      borderTopLeftRadius: 1,
      borderTopRightRadius: 1,
      flexDirection: 'row',
      alignItems:"center", 
      justifyContent:"center"
    },
    cardContent: {
      paddingVertical: 12.5,
      paddingHorizontal: 16,
    },
    cardFooter:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 12.5,
      paddingBottom: 25,
      paddingHorizontal: 16,
      borderBottomLeftRadius: 1,
      borderBottomRightRadius: 1,
    },
    cardImage:{
      height: 50,
      width: 50,
      alignSelf:'center'
    },
    title:{
      fontSize:18,
      flex:1,
      alignSelf:'center',
      color:"#696969",
      fontWeight:"bold",
    },
})
