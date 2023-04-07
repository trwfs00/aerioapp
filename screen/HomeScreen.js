import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity, } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import { BlurView } from 'expo-blur';


export default function HomeScreen() {
  
  return (
    
    <View style={{ flex: 1, backgroundColor: '#FFFFFF'}}>
      
      <View
        style={{
          backgroundColor: "#4CD964",
          borderBottomStartRadius: 40,
          padding: 25,
          height: "66%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              padding: 15,
              borderRadius: 40,
              alignItems: "center",
              marginVertical: 20,
            }}
            onPress={() => console.log("test")}
          >
            <Icon name="bell-o" size={20} color="black" />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{
              alignSelf: "flex-start",
              marginTop: "auto",
              marginBottom: "auto",
            }}
          >
            <Text style={{ color: "white" }}>Good mornig 👋</Text>
            <Text style={{ color: "white", fontSize: 27, fontWeight: 600 }}>
            Name Surname
            </Text>
          </View>

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
      </View>
      <BlurView
        intensity={60}
        style={{
          position: 'absolute',
          zIndex: 1,
          width: 360,
          alignSelf: "center",
          marginTop: 210,
          borderRadius: 35,
           borderWidth: 1, 
          borderColor: 'white',
          padding: 20,
          paddingTop: 30,
          shadowColor: '#000',
          
        }}
        
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ alignSelf: "flex-start", }}>
            <Text style={styles.showTextTitle}>Feels Like</Text>
            <Text style={styles.showText}>39 °C</Text>
            <Text style={styles.showTextTitle}>Humidity</Text>
            <Text style={styles.showText}>38%</Text>
            <Text style={styles.showTextTitle}>Pressure</Text>
            <Text style={styles.showText}>1,005 hPa</Text>
            <Text style={styles.showTextTitle}>Wind Speed</Text>
            <Text style={styles.showText}>SW 3.75</Text>
          </View>
          <Image
            style={{
              width: 200,
              height: 250,
              resizeMode: "contain",
              alignSelf: "flex-end",
            }}
            source={require("../assets/person.png")}
          />
        </View>

        <View>
          <Text style={{ marginTop: 20 }}>Air is</Text>
          <Text style={{ fontSize: 22, fontWeight: 600, marginBottom: 15 }}>GOOD</Text>
          <Text style={{ marginBottom: 30 }}>Breath deeply and enjoy the fresh, clean air around you.</Text>
        </View>
        <View style={{ borderBottomColor: '#BFD5DF', borderBottomWidth: 1, marginBottom: 15 }}></View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{flexDirection: "row"}}>
            <View style={{marginRight:16}}>
              <Text>US AQI</Text>
              <Text style={{ textAlign: 'center', fontWeight: 500, fontSize: 18 }}>24</Text>
            </View>
            <View style={{ justifyContent: "flex-start" }}>
              <Text>CN AQI</Text>
              <Text style={{ textAlign: 'center', fontWeight: 500, fontSize: 18 }}>25</Text>
            </View>
          </View>

          <View style={{ alignSelf: 'flex-end' }}>
            <Text style={{textAlign:"right"}}>Address</Text>
            <Text style={{textAlign:"right",color:"#A2A6AA"}}>Khon Kaen, Thailand</Text>
          </View>
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sub_text: {
    marginTop: 12,
    fontSize: 12,
    fontWeight: 'normal',
    fontWeight: "normal",
  },
  showTextTitle: {
    color: 'white'
  },

  showText: {
    color: 'white',
    fontSize: 23,
    fontWeight: 600,
    marginBottom: 20,
  }
})
