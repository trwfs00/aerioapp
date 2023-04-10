import React from "react";
import firebase from "firebase/compat/app";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import {Text,View,TextInput,Button,StyleSheet,TouchableOpacity,Platform,Image,} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import EditProfileScreen from "./EditProfileScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

function Profile(){

  const navigation = useNavigation();

  return(
    <View style={{ flex: 1,backgroundColor:'#ffffff' }}>
      <View
        style={{
          padding: 20,
          paddingTop: 50,
          backgroundColor: "#0598ED",
          paddingBottom: 50,
          borderBottomStartRadius: 40,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            
          }}
        >
          <View
            style={{
              alignSelf: "flex-start",
              marginTop: "auto",
              marginBottom: "auto",
            }}
          >
            <Text style={{ color: "white" }}>Good morning 👋</Text>
            
              <Text style={{ color: "white", fontSize: 27, fontWeight: 600 }}>
                username
              </Text>
            
          </View>

          <Image
            style={{
              width: 70,
              height: 70,
              resizeMode: "contain",
              alignSelf: "flex-end",
              marginLeft: "auto",
            }}
            source={require("../assets/cloud.png")}
          />
        </View>
        <View style={{ borderBottomColor: '#BFD5DF', borderBottomWidth: 1, marginVertical: 15 }}></View>
        <Text style={styles.text}>Account</Text>
        <TouchableOpacity 
        style={{
          flexDirection:'row',
          display:'flex',
          marginBottom:40,
        }}
        onPress={() => navigation.navigate('EditProfile')}
        >
          <Icon name="user-o" size={30} color="#ffffff" />
          <Text style={styles.text2}>Person Information</Text>
          <Icon name="angle-right" size={30} color="#ffffff" style={{marginLeft:'auto'}} />
        </TouchableOpacity>
        <Text style={styles.text}>About</Text>
        <TouchableOpacity 
        style={{
          flexDirection:'row',
          display:'flex',
          marginBottom:25,
        }}
        >
          <Icon name="lock" size={30} color="#ffffff" />
          <Text style={styles.text2}>Privacy & Policy</Text>
          <Icon name="angle-right" size={30} color="#ffffff" style={{marginLeft:'auto'}} />
        </TouchableOpacity>
        <TouchableOpacity 
        style={{
          flexDirection:'row',
          display:'flex',
          marginBottom:25,
        }}
        >
          <Icon name="shield" size={30} color="#ffffff" />
          <Text style={styles.text2}>Terms of Services</Text>
          <Icon name="angle-right" size={30} color="#ffffff" style={{marginLeft:'auto'}} />
        </TouchableOpacity>
        <TouchableOpacity 
        style={{
          flexDirection:'row',
          display:'flex',
        }}
        onPress={() => {getAuth().signOut()}}
        >
          <Icon name="sign-out" size={30} color="#ffffff" />
          <Text style={styles.text2}>Logout</Text>
          <Icon name="angle-right" size={30} color="#ffffff" style={{marginLeft:'auto'}} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const Stack = createNativeStackNavigator();

export default function ProfileScreen() {
  return (
            <Stack.Navigator    
                screenOptions={{
                    headerShown:false
                }}
                >
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="EditProfile" component={EditProfileScreen} />
                
            </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
    text:{
      color:"white",
      fontSize:15,
      marginBottom:15,
    },
    text2:{
      color:"white",
      fontSize:20,
      marginVertical:'auto',
      marginLeft:15
    },
})
