import React, { useState }  from 'react';
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


export default function SearchScreen() {


  return (
    // <View style={styles.container}>
    //   <Text style={styles.title}>Air Quality</Text>
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Enter city"
    //     onChangeText={text => setCity(text)}
    //     value={city}
    //   />
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Enter state"
    //     onChangeText={text => setState(text)}
    //     value={state}
    //   />
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Enter country"
    //     onChangeText={text => setCountry(text)}
    //     value={country}
    //   />
    //   <Button title="Search" onPress={fetchAqiData} />
    //   {aqiData && (
    //     <View style={styles.aqiData}>
    //       <Text style={styles.aqiTitle}>Air Quality Index: {aqiData.data.current.pollution.aqius}</Text>
    //     </View>
    //   )}
    // </View>
    <View style={{ flex: 1,backgroundColor:'#FFFFFF' }}>
            <View style={{ padding: 20,paddingTop:50, backgroundColor: "#0598ED", paddingBottom: 50, borderBottomStartRadius: 40 }}>
                <View style={{ flexDirection: "row", display:'flex' }}>
                    {/* <TouchableOpacity>
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
                    </TouchableOpacity> */}

                    <Image
                        style={{
                            width: 70,
                            height: 70,
                            resizeMode: "contain",
                            alignSelf: "flex-end",
                            marginLeft:"auto"
                        }}
                        source={require("../assets/cloud.png")}
                    />
                </View>

                <Text style={{ color: "white", fontWeight: "500", fontSize: 25, marginTop: 40 }}>Search</Text>
                <Text style={{ color: "white", marginTop: 8, fontSize: 16 }}>Provide your country and the details to searching for air quality data</Text>

                {/* <Text style={{ marginTop: 40, color: "white" }}>Phone No.</Text> */}
                <TextInput
                    style={{
                        marginVertical: 10,
                        fontSize: 16,
                        borderRadius: 40,
                        padding: 10,
                        backgroundColor: "white",
                        color: "black",
                        marginTop:40,
                        paddingLeft:20,
                    }}
                    placeholder="Country"
                />
                <TextInput
                    style={{
                        marginVertical: 10,
                        fontSize: 16,
                        borderRadius: 40,
                        padding: 10,
                        backgroundColor: "white",
                        color: "black",
                        marginTop:5,
                        paddingLeft:20,
                    }}
                    placeholder="State"
                />
                <TextInput
                    style={{
                        marginVertical: 10,
                        fontSize: 16,
                        borderRadius: 40,
                        padding: 10,
                        backgroundColor: "white",
                        color: "black",
                        marginTop:5,
                        paddingLeft:20,
                    }}
                    placeholder="City"
                />

                {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TextInput
                        style={{
                            marginVertical: 10,
                            fontSize: 17,
                            borderBottomLeftRadius: 20,
                            borderTopLeftRadius: 20,
                            padding: 10,
                            fontSize: 16,
                            width: "65%",
                            color: "black",
                            backgroundColor: "white",

                        }}
                        editable={!!verificationId}
                        placeholder="Enter 6-digit code"
                        onChangeText={setVerificationCode}
                        placeholderTextColor={"#A1B3C2"}
                        keyboardType="phone-pad"
                    />
                    <TouchableOpacity
                        style={{
                            backgroundColor: "white",
                            borderBottomRightRadius: 20,
                            borderTopRightRadius: 20,
                            flex: 1,
                            paddingVertical: 14,
                        }}
                        disabled={!phoneNumber}
                        onPress={async () => {

                            try {
                                const phoneProvider = new PhoneAuthProvider(auth);
                                const verificationId = await phoneProvider.verifyPhoneNumber(
                                    phoneNumber,
                                    recaptchaVerifier.current
                                );
                                setVerificationId(verificationId);
                                showMessage({
                                    text: "Verification code has been sent to your phone.",
                                });
                            } catch (err) {
                                showMessage({ text: `Error: ${err.message}`, color: "red" });
                            }
                        }}
                    >
                        <Text style={{ color: "#05A0FA", fontSize: 15, textAlign: "center", borderLeftWidth: 2, borderColor: "#05A0FA" }}>Send OTP</Text>
                    </TouchableOpacity>
                    
                </View> */}

            </View>
            <View style={{ flex: 1 }}></View>
            <View style={{ padding: 30, }}>

                <TouchableOpacity
                    title="Search"
                    color={"#05A0FA"}
                    // disabled={!verificationId}
                    // onPress={async () => {
                    //     try {
                    //         const credential = PhoneAuthProvider.credential(
                    //             verificationId,
                    //             verificationCode
                    //         );
                    //         await signInWithCredential(auth, credential);
                    //         showMessage({ text: "Phone authentication successful 👍" });
                    //     } catch (err) {
                    //         showMessage({ text: `Error: ${err.message}`, color: "red" });
                    //     }
                    // }}
                    style={{ textTransform: "none", backgroundColor: "#05A0FA", padding: 10, borderRadius: 30 }}
                >
                    <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>Search</Text>
                </TouchableOpacity>

            </View>

        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  aqiData: {
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: '#ccc',
    width: '100%',
  },
  aqiTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  aqiText: {
    marginBottom: 5,
  },
});