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
import axios from 'axios';
import Dropdown from './component/Dropdown'
import { BlurView } from 'expo-blur';

const _01d = require('../assets/icon/01d.png');
const _01n = require('../assets/icon/01n.png');
const _02d = require('../assets/icon/02d.png');
const _02n = require('../assets/icon/02n.png');
const _03d = require('../assets/icon/03d.png');
const _04d = require('../assets/icon/04d.png');
const _09d = require('../assets/icon/09d.png');
const _10d = require('../assets/icon/10d.png');
const _10n = require('../assets/icon/10n.png');
const _11d = require('../assets/icon/11d.png');
const _13d = require('../assets/icon/13d.png');
const _50d = require('../assets/icon/50d.png');
const a0_50 = require('../assets/character/0-50.png');
const a51_100 = require('../assets/character/51-100.png');
const a101_150 = require('../assets/character/101-150.png');
const a151_200 = require('../assets/character/151-200.png');
const a201_300 = require('../assets/character/201-300.png');
const a301_500 = require('../assets/character/301-500.png');

const SECRET_API_KEY = "df43a3f1-23cd-485e-a31a-2ef59b5eced5";

export default function SearchScreen() {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [aqiData, setAqiData] = useState(null);

  const fetchAqiData = () => {
    const url = `http://api.airvisual.com/v2/city?city=${selectedCity}&state=${selectedState}&country=${selectedCountry}&key=${SECRET_API_KEY}`;

    axios.get(url)
      .then(response => {
        setAqiData(response.data);
        console.log(response.data.data.current.weather.ic)
      })
      .catch(error => {
        console.log(error);
        alert('Failed to fetch air quality data');
      });
  };

  function getDefiniteAqi(aqi) {
    if(aqi >= 301) return "HAZARDOUS";
    if(aqi >= 201) return "VERY UNHEALTHY";
    if(aqi >= 151) return "UNHEALTHY";
    if(aqi >= 101) return "UNHEALTHY (For sensitive)";
    if(aqi >= 51) return "MODERATE";
    if(aqi >= 0) return "GOOD";
  }

  function getSubtitleAqi(aqi) {
    if(aqi >= 301) return "Outdoor air is hazardous. Stay indoors, wear a mask if going outside, especially if you have respiratory issues";
    if(aqi >= 201) return "Serious breathing discomfort, people with respiratory issues may severe symptoms. Stay indoors and avoid physical activity.";
    if(aqi >= 151) return "Breathing discomfort, especially those with respiratory issues. It's best to stay indoors and avoid physical exertion.";
    if(aqi >= 101) return "Children, the elderly, and those with respiratory issues may experience breathing difficulties. Limit outdoor activity if possible.";
    if(aqi >= 51) return "Most people can breathe easily, but individuals with respiratory issues may experience mild discomfort.";
    if(aqi >= 0) return "Breathe deeply and enjoy the fresh, clean air around you.";
  }

  function changeColor(value) {
    if(value >= 301) return "#872E47";
    if(value >= 201) return "#8E4296";
    if(value >= 151) return "#EF574E";
    if(value >= 101) return "#FF9900";
    if(value >= 51) return "#FBD405";
    if(value >= 0) return "#4CD964";
  } 

  const getCharacterSource = (aqi) => {
    if(aqi >= 301) return a301_500;
    if(aqi >= 201) return a201_300;
    if(aqi >= 151) return a151_200;
    if(aqi >= 101) return a101_150;
    if(aqi >= 51) return a51_100;
    if(aqi >= 0) return a0_50;
  }

  const getImageSource = (icon) => {
    switch (icon) {
      case "01d":
        return _01d;
      case "01n":
        return _01n;
      case "02d":
        return _02d;
      case "02n":
        return _02n;
      case "03d":
        return _03d;
      case "03n":
        return _03d;
      case "04d":
        return _04d;
        case "04n":
        return _04d;
      case "09d":
        return _09d;
      case "09n":
        return _09d;
      case "10d":
        return _10d;
      case "10n":
        return _10n;
      case "11d":
        return _11d;
      case "13d":
        return _13d;
      case "50d":
        return _50d;
      default:
        return null;
    }
  };

  function windDirection(degrees) {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  }

  useEffect(() => {
    setSelectedCountry(null);
    setSelectedState(null);
    setSelectedCity(null);
  }, []);

  const handleBack = () => {
    setAqiData(null);
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      {!aqiData && (
        <>
          <View style={{ padding: 20, paddingTop: 50, backgroundColor: "#0598ED", paddingBottom: 50, borderBottomStartRadius: 40 }}>
            <View style={{ flexDirection: "row", display: 'flex' }}>
              <Image
                style={{
                  width: 70,
                  height: 70,
                  resizeMode: "contain",
                  alignSelf: "flex-end",
                  marginLeft: "auto"
                }}
                source={require("../assets/cloud.png")}
              />
            </View>

            <Text style={{ color: "white", fontWeight: "500", fontSize: 25, marginTop: 40 }}>Search</Text>
            <Text style={{ color: "white", marginTop: 8, marginBottom: 16, fontSize: 16 }}>Provide your country and the details to searching for air quality data</Text>
            <Dropdown
              onSelectCountry={setSelectedCountry}
              onSelectState={setSelectedState}
              onSelectCity={setSelectedCity}
            />
          </View>
          <View style={{ flex: 1 }}></View>
          <View style={{ padding: 30, }}>
            {selectedCity && (
              <TouchableOpacity
                title="Search"
                color={"#05A0FA"}
                style={{ textTransform: "none", backgroundColor: "#05A0FA", padding: 10, borderRadius: 30 }}
                onPress={fetchAqiData}
              >
                <Text style={{ color: "white", textAlign: "center", fontSize: 18 }}>Search</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
      {aqiData && (
        <>
          <View
            style={{
              backgroundColor: changeColor(aqiData.data.current.pollution.aqius),
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
                  padding: 15,
                  borderRadius: 40,
                  alignItems: "center",
                  marginVertical: 20,
                  width: 80,
                  height: 55,
                }}
                onPress={handleBack}
              >
                <Image source={require('../assets/back_icon.png')} style={{height: 50, resizeMode: 'contain', transform: [{translateX: -14}],}}/>
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
                <Text style={{ color: "white" }}>{aqiData.data.city}</Text>
                <Text style={{ color: "white", fontSize: 27, fontWeight: 600 }}>
                  {aqiData.data.state}, {aqiData.data.country}
                </Text>
              </View>

              <Image
                style={{
                  width: 70,
                  height: 70,
                  resizeMode: "contain",
                  alignSelf: "flex-end",
                }}
                source={getImageSource(aqiData.data.current.weather.ic)}
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
              //  borderWidth: 1, 
              borderColor: 'white',
              padding: 20,
              paddingTop: 30,
              shadowColor: '#000',

            }}

          >
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 10 }}>
              <View style={{ alignSelf: "flex-start", }}>
                <Text style={styles.showTextTitle}>Feels Like</Text>
                <Text style={styles.showText}>{aqiData.data.current.weather.tp} °C</Text>
                <Text style={styles.showTextTitle}>Humidity</Text>
                <Text style={styles.showText}>{aqiData.data.current.weather.hu}%</Text>
                <Text style={styles.showTextTitle}>Pressure</Text>
                <Text style={styles.showText}>{aqiData.data.current.weather.pr} hPa</Text>
                <Text style={styles.showTextTitle}>Wind Speed</Text>
                <Text style={styles.showText}>{windDirection(aqiData.data.current.weather.wd)} {aqiData.data.current.weather.ws} km/s</Text>
              </View>
              <Image
                style={{
                  width: 200,
                  height: 250,
                  resizeMode: "contain",
                  alignSelf: "flex-end",
                  transform: [{ translateY: 22 }]
                }}
                source={getCharacterSource(aqiData.data.current.pollution.aqius)}
              />
            </View>

            <View style={{ marginHorizontal: 10 }}>
              <Text style={{ marginTop: 40 }}>Air is</Text>
              <Text style={{ fontSize: 22, fontWeight: 600, marginBottom: 15 }}>{getDefiniteAqi(aqiData.data.current.pollution.aqius)}</Text>
              <Text style={{ marginBottom: 20 }}>{getSubtitleAqi(aqiData.data.current.pollution.aqius)}</Text>
            </View>
            <View style={{ borderBottomColor: '#BFD5DF', borderBottomWidth: 1, marginBottom: 15 }}></View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 10 }}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ marginRight: 16 }}>
                  <Text>US AQI</Text>
                  <Text style={{ textAlign: 'center', fontWeight: 500, fontSize: 18 }}>
                    {aqiData.data.current.pollution.aqius}
                  </Text>
                </View>
                <View style={{ justifyContent: "flex-start" }}>
                  <Text>CN AQI</Text>
                  <Text style={{ textAlign: 'center', fontWeight: 500, fontSize: 18 }}>
                    {aqiData.data.current.pollution.aqicn}
                  </Text>
                </View>
              </View>

              <View style={{ alignSelf: 'flex-end' }}>
                <Text style={{ textAlign: "right" }}>Address</Text>
                <Text style={{ textAlign: "right", color: "#A2A6AA" }}>{`${aqiData.data.city}, ${aqiData.data.state}, ${aqiData.data.country}`}</Text>
              </View>
            </View>
          </BlurView>
        </>
      )}
    </View>
  );
};

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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     padding: 10,
//     marginBottom: 20,
//     width: '100%',
//   },
//   button: {
//     backgroundColor: '#2196F3',
//     padding: 10,
//     borderRadius: 5,
//     width: '100%',
//   },
//   buttonText: {
//     color: '#fff',
//     textAlign: 'center',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   aqiData: {
//     marginTop: 20,
//     borderWidth: 1,
//     borderRadius: 5,
//     padding: 10,
//     borderColor: '#ccc',
//     width: '100%',
//   },
//   aqiTitle: {
//     fontWeight: 'bold',
//     fontSize: 18,
//     marginBottom: 10,
//   },
//   aqiText: {
//     marginBottom: 5,
//   },
// });