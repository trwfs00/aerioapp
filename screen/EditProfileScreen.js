import React, { useState, useEffect } from 'react';
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import {Text,View,TextInput,Button,StyleSheet,TouchableOpacity,Platform,Image,} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { getDatabase,ref,set,onValue,update } from '@firebase/database';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';




export default function EditProfileScreen() {

    const navigation = useNavigation();

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [name,setName] = useState('')

    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [userData,setUserData] = useState(null)
    const user = getAuth().currentUser
    const db = getDatabase()
    const userRef =  ref(db,'user/' + user.uid)

    useEffect(() => {
        
        onValue(userRef,(snapshot)=>{
          const data = snapshot.val()
          setUserData(data)
        })
        console.log(userData)
      }, [user.uid]);

      const updateData = () =>{
        const db = getDatabase();
        const userRef = ref(db,'user/' + user.uid)
        
        update(userRef,{
            username:name
        }).then(() =>{
            console.log('Data update')
        }).catch((error) =>{
            console.log('Error:',error)
        })
      }

    return (
        <ScrollView style={{ flex: 1,backgroundColor:"#ffffff" }}>
            
            <View style={{ padding: 20, paddingTop: 50, backgroundColor: "#0598ED", paddingBottom: 50, borderBottomStartRadius: 40 }}>

                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Profile')}
                    >
                        <Image
                            source={require('../assets/back_icon.png')}
                            style={{
                                width: 50,
                                height: 50,
                                resizeMode: "contain",
                                alignSelf: "flex-start",
                                marginTop: "auto", marginBottom: "auto"
                            }}
                        />
                    </TouchableOpacity>

                    <Image
                        style={{
                            width: 70,
                            height: 70,
                            resizeMode: "contain",
                            alignSelf: "flex-end",
                        }}
                        source={require("../assets/cloud.png")}
                    />
                </View>

                <Text style={{ color: "white", fontWeight: "500", fontSize: 25, marginTop: 40 }}>Edit Profile</Text>
                
                <Text style={{ marginTop: 40, color: "white",marginLeft:10 }}>Username</Text>
                {userData && (
                <TextInput
                    style={{
                        marginBottom: 10,
                        fontSize: 16,
                        borderRadius: 20,
                        padding: 10,
                        backgroundColor: "white",
                        color: "black",

                    }}
                    placeholder="Username"
                    placeholderTextColor={"#A1B3C2"}
                    onChangeText={(text) => setName(text)}
                >{userData.username}</TextInput>
                )}
                <Text style={{ color: "white",marginLeft:10 }}>Email</Text>
                {userData && (
                    <TextInput
                    style={{
                        marginVertical: 10,
                        fontSize: 16,
                        borderRadius: 20,
                        padding: 10,
                        backgroundColor: "white",
                        color: "black"
                    }}
                    placeholder="Email"
                    placeholderTextColor={"#A1B3C2"}
                    onChangeText={(text) => setEmail(text)}
                >{userData.email}</TextInput>
                )}
                <Text style={{ color: "white",marginLeft:10 }}>Password</Text>
                {userData && (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                        style={{
                            marginVertical: 10,
                            flex: 1,
                            fontSize: 16,
                            padding: 10,
                            borderBottomLeftRadius: 20,
                            borderTopLeftRadius: 20,
                            backgroundColor:"white",
                         }}
                        placeholder="Enter Password"
                        placeholderTextColor={"#A1B3C2"}
                        secureTextEntry={!showPassword}
                        onChangeText={(text) => setPassword(text)}
                    >{userData.password}</TextInput>
                    <TouchableOpacity onPress={togglePasswordVisibility}
                        style={{
                            backgroundColor: "white",
                            borderBottomRightRadius: 20,
                            borderTopRightRadius: 20,
                            paddingVertical: 11.2,
                        }}>
                        <Ionicons
                            name={showPassword ? 'eye-off' : 'eye'}
                            size={24}
                            color="#05A0FA"
                            style={{ paddingHorizontal: 10,borderLeftWidth:1,borderColor:"#05A0FA" }}
                        />
                    </TouchableOpacity>
                </View>
                )}
                <Text style={{ color: "white",marginLeft:10 }}>Confirm Password</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                        style={{
                            marginVertical: 10,
                            flex: 1,
                            fontSize: 16,
                            padding: 10,
                            borderBottomLeftRadius: 20,
                            borderTopLeftRadius: 20,
                            backgroundColor:"white",
                         }}
                        placeholder="Confirm Password"
                        placeholderTextColor={"#A1B3C2"}
                        secureTextEntry={!showPassword}
                        onChangeText={(text) => setConfirmPassword(text)}
                    />
                    <TouchableOpacity onPress={togglePasswordVisibility}
                        style={{
                            backgroundColor: "white",
                            borderBottomRightRadius: 20,
                            borderTopRightRadius: 20,
                            paddingVertical: 11.2,
                        }}>
                        <Ionicons
                            name={showPassword ? 'eye-off' : 'eye'}
                            size={24}
                            color="#05A0FA"
                            style={{ paddingHorizontal: 10,borderLeftWidth:1,borderColor:"#05A0FA" }}
                        />
                    </TouchableOpacity>
                </View>
                
                {!passwordsMatch && (
                <Text style={{ color: "red", marginTop: 5 }}>
                    Passwords do not match
                </Text>
                )}

            </View>
            <View style={{ flex: 1 }}></View>
            <View style={{ padding: 30 }}>
                <TouchableOpacity
                    color={"#05A0FA"}
                    style={{ textTransform: "none", backgroundColor: "#05A0FA", padding: 10, borderRadius: 30 }}
                    onPress={updateData}
                >
                    <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>Confirm</Text>
                </TouchableOpacity>
                
            </View>

        </ScrollView>
    )
}