import * as React from "react";
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
import {
    FirebaseRecaptchaVerifierModal,
    FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";
import { initializeApp, getApp } from "firebase/app";
import {
    getAuth,
    PhoneAuthProvider,
    signInWithCredential,
} from "firebase/auth";
import Icon from 'react-native-vector-icons/FontAwesome';
import { BottomNavigation } from "react-native-paper";

export default function LoginScreen() {
    // Ref or state management hooks
    const app = getApp();
    const auth = getAuth();
    const recaptchaVerifier = React.useRef(null);
    const [phoneNumber, setPhoneNumber] = React.useState();
    const [verificationId, setVerificationId] = React.useState();
    const [verificationCode, setVerificationCode] = React.useState();

    const firebaseConfig = app ? app.options : undefined;
    const [message, showMessage] = React.useState();
    const attemptInvisibleVerification = false;

    return (
        <View style={{ flex: 1 }}>
            <View style={{ padding: 20, marginTop: 50, backgroundColor: "#0598ED", paddingBottom: 50, borderBottomStartRadius: 40 }}>

                <FirebaseRecaptchaVerifierModal
                    ref={recaptchaVerifier}
                    firebaseConfig={app.options}
                // attemptInvisibleVerification
                />

                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <TouchableOpacity>
                        <Image
                            source={require('./assets/back_icon.png')}
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
                        source={require("./assets/cloud.png")}
                    />
                </View>

                <Text style={{ color: "white", fontWeight: "500", fontSize: 25, marginTop: 40 }}>Sign in</Text>
                <Text style={{ color: "white", marginTop: 8, fontSize: 16 }}>Phone sign-in: The simplest, safest and fastest way to access your account.</Text>

                <Text style={{ marginTop: 40, color: "white" }}>Phone No.</Text>
                <TextInput
                    style={{
                        marginVertical: 10,
                        fontSize: 16,
                        borderRadius: 20,
                        padding: 10,
                        backgroundColor: "white",
                        color: "black"
                    }}
                    placeholder="Phone Number"
                    autoCompleteType="tel"
                    keyboardType="phone-pad"
                    textContentType="telephoneNumber"
                    onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
                    
                />

                <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                </View>


                {message ? (
                    <TouchableOpacity
                        style={[
                            StyleSheet.absoluteFill,
                            { backgroundColor: 0xffffffee, justifyContent: "center" },
                        ]}
                        onPress={() => showMessage(undefined)}
                    >
                        <Text
                            style={{
                                color: message.color || "blue",
                                fontSize: 17,
                                textAlign: "center",
                                margin: 20,
                            }}
                        >
                            {message.text}
                        </Text>
                    </TouchableOpacity>
                ) : undefined}
                {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
            </View>
            <View style={{ flex: 1 }}></View>
            <View style={{ padding: 30, }}>

                <TouchableOpacity
                    title="Sign in"
                    color={"#05A0FA"}
                    // disabled={!verificationId}
                    onPress={async () => {
                        try {
                            const credential = PhoneAuthProvider.credential(
                                verificationId,
                                verificationCode
                            );
                            await signInWithCredential(auth, credential);
                            showMessage({ text: "Phone authentication successful 👍" });
                        } catch (err) {
                            showMessage({ text: `Error: ${err.message}`, color: "red" });
                        }
                    }}
                    style={{ textTransform: "none", backgroundColor: "#05A0FA", padding: 10, borderRadius: 30 }}
                >
                    <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>Sign in</Text>
                </TouchableOpacity>

            </View>

        </View>


    );
}

const styles = StyleSheet.create({
    //   button:{
    //     backgroundColor:"#05A0FA",
    //     borderRadius:20,
    //   }
})
