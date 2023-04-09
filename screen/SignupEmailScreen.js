// import * as React from "react";
import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    TextInput,
    Button,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Image,
} from "react-native";
import { initializeApp, getApp } from "firebase/app";
import { Ionicons } from '@expo/vector-icons';
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword } from '@firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { getDatabase,set,ref } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCminE7NHtcv2QBkNZs6EgkOi1NimQX2KI",
    authDomain: "aerio-ae7af.firebaseapp.com",
    databaseURL: "https://aerio-ae7af-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "aerio-ae7af",
    storageBucket: "aerio-ae7af.appspot.com",
    messagingSenderId: "826425665597",
    appId: "1:826425665597:web:cfd8c7df913465c861a254",
    measurementId: "G-9415X5N7EN"
  };
    
  try {
    firebase.initializeApp(firebaseConfig);
  } catch (err) { }

export default function SignupEmailScreen() {

    const navigation = useNavigation();
    
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [name,setName] = useState('')

    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    
    // const app = getApp();
    const auth = getAuth();


    const handleCreateAccout = () => {
        const db = getDatabase();
        if (password === confirmPassword) {
            setPasswordsMatch(true);
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {

                    const user = userCredential.user;
                  
                    set(ref(db,'user/' + user.uid),{
                        email: email,
                        password: password,
                        username: name
                      });
                    console.log("Account created", user);
                })
                .catch((error) => {
                    console.log(error);
                    alert(error)
                });
        } else {
            setPasswordsMatch(false);
            // Passwords do not match, show an error message
        }

        
      };
      
      
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    return (
        <View style={{ flex: 1 }}>
            <View style={{ padding: 20, paddingTop: 50, backgroundColor: "#0598ED", paddingBottom: 50, borderBottomStartRadius: 40 }}>

                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('login')}
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

                <Text style={{ color: "white", fontWeight: "500", fontSize: 25, marginTop: 40 }}>Sign up With Email</Text>
                <Text style={{ color: "white", marginTop: 8, fontSize: 16 }}>Email sign-up: The simplest, safest and fastest way to access your account.</Text>
                
                {/* <Text style={{ marginTop: 40, color: "white" }}>Username</Text> */}
                <TextInput
                    style={{
                        marginBottom: 10,
                        fontSize: 16,
                        borderRadius: 20,
                        padding: 10,
                        backgroundColor: "white",
                        color: "black",
                        marginTop:40
                    }}
                    placeholder="Username"
                    placeholderTextColor={"#A1B3C2"}
                    onChangeText={(text) => setName(text)}
                />

                {/* <Text style={{color: "white" }}>Email</Text> */}
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
                />
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
                    title="Sign in"
                    color={"#05A0FA"}
                    style={{ textTransform: "none", backgroundColor: "#05A0FA", padding: 10, borderRadius: 30 }}
                    onPress={handleCreateAccout}
                >
                    <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>Sign up</Text>
                </TouchableOpacity>
                <View
                    style={{flexDirection: 'row', alignItems: 'center',alignSelf:'center',marginTop:10,}}
                >
                    <Text style={{fontSize:16,color:'#A1B3C2'}}>Already have an account? </Text>
                    <TouchableOpacity
                    onPress={() => navigation.navigate('Email')}
                    >
                    <Text
                        style={{textAlign:'center',color:'#05A0FA',fontSize:16,fontWeight:500, textDecorationLine: 'underline'}}
                    >Sign in</Text>
                </TouchableOpacity>
                </View>
                
            </View>

        </View>


    );
}

const styles = StyleSheet.create({

})
