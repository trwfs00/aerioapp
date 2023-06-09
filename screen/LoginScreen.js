import * as React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, TouchableOpacity, ScrollView, Text, View, FlatList, SafeAreaView, LogBox, Image } from 'react-native';
import LoginPhoneScreen from './LoginPhoneScreen';
import LoginEmailScreen from './LoginEmailScreen';
import SignupEmailScreen from './SignupEmailScreen';
import SigupPhoneScreen from './SignupPhoneScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

function SelectLogin() {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}></View>
            <View style={{ marginTop: 40, flex: 1 }}>
                {/* <Image
              source={require('../assets/cloud2.png')}
              style={{
                width: 130,
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
            /> */}
                <Image
                    source={require('../assets/aerioLogo.png')}
                    style={{
                        width: 130,
                        height: 130,
                        resizeMode: 'contain',
                        alignSelf: 'center',
                    }}
                />
                <Image
                    source={require('../assets/aerio.png')}
                    style={{
                        width: 130,
                        height: 30,
                        marginTop: 20,
                        resizeMode: 'contain',
                        alignSelf: 'center',
                    }}
                />

            </View>

            <View style={{ flex: 1 }}></View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 60,

                }}>
                <TouchableOpacity
                    style={{
                        backgroundColor: '#0598ED',
                        padding: 15,
                        borderRadius: 40,
                        width: 60,
                        height: 60,
                        alignItems: 'center'
                    }}
                    onPress={() => navigation.navigate('Phone')}
                >
                    <Icon name="phone" size={30} color="#ffff" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        backgroundColor: '#0598ED',
                        padding: 15,
                        borderRadius: 40,
                        marginStart: 30,
                        width: 60,
                        height: 60,
                        alignItems: 'center'
                    }}
                    onPress={() => navigation.navigate('Email')}>
                    <Icon name="envelope" size={30} color="#ffff" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const Stack = createNativeStackNavigator();

export default function LoginScreen() {

    return (
        <NavigationContainer>
            <Stack.Navigator    
                screenOptions={{
                    headerShown:false
                }}
                >
                <Stack.Screen name="login" component={SelectLogin} />
                <Stack.Screen name="Phone" component={LoginPhoneScreen} />
                <Stack.Screen name="Email" component={LoginEmailScreen} />
                <Stack.Screen name="SignupEmail" component={SignupEmailScreen} />
                <Stack.Screen name="SignupPhone" component={SigupPhoneScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#05A0FA',
        alignItems: 'center',
        justifyContent: 'center',
    },
});