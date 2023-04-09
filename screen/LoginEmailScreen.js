// import * as React from "react";
import React, { useState, useEffect } from 'react';
import {Text,View,TextInput,Button,StyleSheet,TouchableOpacity,Platform,Image,} from "react-native";
import {FirebaseRecaptchaVerifierModal,FirebaseRecaptchaBanner,} from "expo-firebase-recaptcha";
import { initializeApp, getApp } from "firebase/app";
import { Ionicons } from '@expo/vector-icons';
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword } from '@firebase/auth';
import { useNavigation } from '@react-navigation/native';


export default function LoginEmailScreen() {

    const navigation = useNavigation();
    
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const app = getApp();
    const auth = getAuth();

  
      const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log("Signed In", user);
          })
          .catch((error) => {
            console.log(error);
            alert(error)
          });
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

                <Text style={{ color: "white", fontWeight: "500", fontSize: 25, marginTop: 40 }}>Sign in With Email</Text>
                <Text style={{ color: "white", marginTop: 8, fontSize: 16 }}>Email sign-in: The simplest, safest and fastest way to access your account.</Text>

                <Text style={{ marginTop: 40, color: "white" }}>Email</Text>
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
                
            </View>
            <View style={{ flex: 1 }}></View>
            <View style={{ padding: 30 }}>
                <TouchableOpacity
                    title="Sign in"
                    color={"#05A0FA"}
                    style={{ textTransform: "none", backgroundColor: "#05A0FA", padding: 10, borderRadius: 30 }}
                    onPress={handleSignIn}
                >
                    <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>Sign in</Text>
                </TouchableOpacity>

                <View
                    style={{flexDirection: 'row', alignItems: 'center',alignSelf:'center',marginTop:10,}}
                >
                    <Text style={{fontSize:16,color:'#A1B3C2'}}>You don't have an account? </Text>
                    <TouchableOpacity
                    onPress={() => navigation.navigate('Signup')}
                    >
                    <Text
                        style={{textAlign:'center',color:'#05A0FA',fontSize:16,fontWeight:500, textDecorationLine: 'underline'}}
                    >Sign Up</Text>
                </TouchableOpacity>
                </View>
                

            </View>

        </View>


    );
}

const styles = StyleSheet.create({

})
