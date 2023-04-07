import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity, } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import * as Location from 'expo-location';
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

const API_KEY = '696a49a5-7001-4cd5-98eb-b88cbde9cbc8';
const WEATHER_API_URL = `http://api.airvisual.com/v2/nearest_city?key=${API_KEY}`;


export default function HomeScreen() {
  const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [usaqi, setUsAqi] = useState(null);
  const [cnaqi, setCnAqi] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [country, setCountry] = useState(null);
  const [pmColor, setPmColor] = useState(null);
  const [dayOrNight, setDayOrNight] = useState(null);
  const [greeting, setGreeting] = useState("");
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    getLocationAsync();
  }, []);
  useEffect(() => {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const hour = now.getUTCHours() + offset / 60;
    if (hour >= 6 && hour < 12) {
      setDayOrNight("morning");
    } else if (hour >= 12 && hour < 18) {
      setDayOrNight("afternoon");
    } else if (hour >= 18 && hour < 24) {
      setDayOrNight("evening");
    } else {
      setDayOrNight("night");
    }
  }, []);
  
  useEffect(() => {
    switch (dayOrNight) {
      case "morning":
        setGreeting("Good morning");
        break;
      case "afternoon":
        setGreeting("Good afternoon");
        break;
      case "evening":
        setGreeting("Good evening");
        break;
      case "night":
        setGreeting("Good night");
        break;
      default:
        setGreeting("");
    }
  }, [dayOrNight]);  

  async function getLocationAsync() {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMessage('Permission to access location was denied');
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync();
      setLocation(coords);

      getWeatherDataAsync(coords.latitude, coords.longitude);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  async function getWeatherDataAsync(latitude, longitude) {
    try {
      let response = await fetch(`${WEATHER_API_URL}&lat=${latitude}&lon=${longitude}`);
      let data = await response.json();
      setWeatherData(data.data.current.weather);
      setUsAqi(data.data.current.pollution.aqius);
      setCnAqi(data.data.current.pollution.aqicn);
      setCity(data.data.city);
      setState(data.data.state);
      setCountry(data.data.country);
      setIcon(data.data.current.weather.ic)

      changeColor(usaqi);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

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
    if(value >= 301) setPmColor("#872E47");
    if(value >= 201) setPmColor("#8E4296");
    if(value >= 151) setPmColor("#EF574E");
    if(value >= 101) setPmColor("#FF9900");
    if(value >= 51) setPmColor("#FBD405");
    if(value >= 0) setPmColor("#4CD964");
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
      case "04d":
        return _04d;
      case "09d":
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

  if (errorMessage) {
    return (
      <View style={styles.container}>
        <Text>{errorMessage}</Text>
      </View>
    );
  } else if (location && weatherData) {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFFFFF', }}>
      
      <View
        style={{
          backgroundColor: pmColor,
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
            <Text style={{ color: "white" }}>{greeting} 👋</Text>
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
            source={getImageSource(icon)}
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
            <Text style={styles.showText}>{weatherData.tp} °C</Text>
            <Text style={styles.showTextTitle}>Humidity</Text>
            <Text style={styles.showText}>{weatherData.hu}%</Text>
            <Text style={styles.showTextTitle}>Pressure</Text>
            <Text style={styles.showText}>{weatherData.pr} hPa</Text>
            <Text style={styles.showTextTitle}>Wind Speed</Text>
            <Text style={styles.showText}>{windDirection(weatherData.wd)} {weatherData.ws} km/s</Text>
          </View>
          <Image
            style={{
              width: 200,
              height: 250,
              resizeMode: "contain",
              alignSelf: "flex-end",
              transform: [{ translateY: 22 }]
            }}
            source={getCharacterSource(usaqi)}
          />
        </View>

        <View style={{marginHorizontal: 10}}>
          <Text style={{ marginTop: 40 }}>Air is</Text>
          <Text style={{ fontSize: 22, fontWeight: 600, marginBottom: 15 }}>{getDefiniteAqi(usaqi)}</Text>
          <Text style={{ marginBottom: 20 }}>{getSubtitleAqi(usaqi)}</Text>
        </View>
        <View style={{ borderBottomColor: '#BFD5DF', borderBottomWidth: 1, marginBottom: 15 }}></View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 10}}>
          <View style={{flexDirection: "row"}}>
            <View style={{marginRight:16}}>
              <Text>US AQI</Text>
              <Text style={{ textAlign: 'center', fontWeight: 500, fontSize: 18 }}>
                {usaqi}
              </Text>
            </View>
            <View style={{ justifyContent: "flex-start" }}>
              <Text>CN AQI</Text>
              <Text style={{ textAlign: 'center', fontWeight: 500, fontSize: 18 }}>
                {cnaqi}
              </Text>
            </View>
          </View>

          <View style={{ alignSelf: 'flex-end' }}>
            <Text style={{textAlign:"right"}}>Address</Text>
            <Text style={{textAlign:"right",color:"#A2A6AA"}}>{`${city}, ${state}, ${country}`}</Text>
          </View>
        </View>
      </BlurView>
    </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
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
