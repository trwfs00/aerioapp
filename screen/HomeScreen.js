import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity, } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import { BlurView } from 'expo-blur';
import * as Location from 'expo-location';
import axios from 'axios';

const _01d = require("../assets/icon/01d.png");
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


const SECRET_API_KEY = "696a49a5-7001-4cd5-98eb-b88cbde9cbc8";

export default function HomeScreen() {
  const [location, setLocation] = useState(null);
  const [aqi, setAqi] = useState(null);
  const [countries, setCountries] = useState(null);
  const [states, setStates] = useState(null);
  const [cities, setCities] = useState(null);
  const [weather, setWeather] = useState(null);
  const [icon, setIcon] = useState(null);
  const [pressure, setPressure] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [windDirect, setWindDirect] = useState(null);
  const [dayOrNight, setDayOrNight] = useState(null);
  const [greeting, setGreeting] = useState("");

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

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    getNearestCityData(location.coords.latitude, location.coords.longitude);
  };

  const getNearestCityData = async (latitude, longitude) => {
    const response = await axios.get(`http://api.airvisual.com/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=${SECRET_API_KEY}`);
    const nearestCity = response.data.data;
    setAqi(nearestCity.current.pollution.aqius);
    setCountries(nearestCity.country);
    setStates(nearestCity.state);
    setCities(nearestCity.city);
    setWeather(nearestCity.current.weather.tp);
    setIcon(nearestCity.current.weather.ic);
    setPressure(nearestCity.current.weather.pr);
    setHumidity(nearestCity.current.weather.hu);
    setWindSpeed(nearestCity.current.weather.ws);
    setWindDirect(nearestCity.current.weather.wd);
  };

  function windDirection(degrees) {
    const directions = ["North", "North East", "East", "South East", "South", "South West", "West", "North West"];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
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

  // const getNearestCityData = async (latitude, longitude) => {
  //   const response = await axios.get(`http://api.airvisual.com/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=${SECRET_API_KEY}`);
  //   const nearestCity = response.data.data;
  //   setAqi(nearestCity.current.pollution.aqius);
  //   setCountries(nearestCity.country);
  //   setStates(nearestCity.state);
  //   setCities(nearestCity.city);
  //   setWeather(nearestCity.current.weather.tp)
  //   setIcon(nearestCity.current.weather.ic)
  // };

  return (
    <View style={styles.container}>
      <Text>{greeting}, username</Text>
      <Image source={getImageSource(icon)} style={{ width: 50, height: 50 , margin: 16, resizeMode: 'contain'}} />
      {location && (
        <View style={styles.box}>
          <Image source={getImageSource(icon)} style={{ width: 50, height: 50 , margin: 16, resizeMode: 'contain'}} />
          <Text style={styles.text}>{weather}°C AQI: {aqi}</Text>
          <Text style={styles.text}>Pressure: {pressure}hPa, Humidity: {humidity}%</Text>
          <Text style={styles.text}>Wind Speed: {windSpeed}km/s</Text>
          <Text style={styles.text}>Wind Direction: {windDirection(windDirect)}</Text>
          <Text style={styles.text}>{states}, {countries}</Text>
          <Text style={styles.sub_text}>{cities}</Text>
        </View>
      )}
    </View>
    // <View style={{ flex: 1, backgroundColor: '#FFFFFF', }}>
      
    //   <View
    //     style={{
    //       backgroundColor: "#4CD964",
    //       borderBottomStartRadius: 40,
    //       padding: 25,
    //       height: "66%",
          
    //     }}
    //   >
    //     <View
    //       style={{
    //         flexDirection: "row",
    //         justifyContent: "space-between",
    //       }}
    //     >
    //       <TouchableOpacity
    //         style={{
    //           backgroundColor: "white",
    //           padding: 15,
    //           borderRadius: 40,
    //           alignItems: "center",
    //           marginVertical: 20,
    //         }}
    //         onPress={() => console.log("test")}
    //       >
    //         <Icon name="bell-o" size={20} color="black" />
    //       </TouchableOpacity>
    //     </View>

    //     <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
    //       <View
    //         style={{
    //           alignSelf: "flex-start",
    //           marginTop: "auto",
    //           marginBottom: "auto",
    //         }}
    //       >
    //         <Text style={{ color: "white" }}>{greeting} 👋</Text>
    //         <Text style={{ color: "white", fontSize: 27, fontWeight: 600 }}>
    //         Name Surname
    //         </Text>
    //       </View>

    //       <Image
    //         style={{
    //           width: 70,
    //           height: 70,
    //           resizeMode: "contain",
    //           alignSelf: "flex-end",
    //         }}
    //         source={require("../assets/cloud.png")}
    //       />
    //     </View>
    //   </View>
      
    //   <BlurView
    //     intensity={60}
    //     style={{
    //       position: 'absolute',
    //       zIndex: 1,
    //       width: 360,
    //       alignSelf: "center",
    //       marginTop: 210,
    //       borderRadius: 35,
    //       //  borderWidth: 1, 
    //       borderColor: 'white',
    //       padding: 20,
    //       paddingTop: 30,
    //       shadowColor: '#000',
          
    //     }}
        
    //   >
    //     <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
    //       <View style={{ alignSelf: "flex-start", }}>
    //         <Text style={styles.showTextTitle}>Feels Like</Text>
    //         <Text style={styles.showText}>{weather} °C</Text>
    //         <Text style={styles.showTextTitle}>Humidity</Text>
    //         <Text style={styles.showText}>{humidity}%</Text>
    //         <Text style={styles.showTextTitle}>Pressure</Text>
    //         <Text style={styles.showText}>1,005 hPa</Text>
    //         <Text style={styles.showTextTitle}>Wind Speed</Text>
    //         <Text style={styles.showText}>SW 3.75</Text>
    //       </View>
    //       <Image
    //         style={{
    //           width: 200,
    //           height: 250,
    //           resizeMode: "contain",
    //           alignSelf: "flex-end",
    //         }}
    //         source={require("../assets/person.png")}
    //       />
    //     </View>

    //     <View>
    //       <Text style={{ marginTop: 20 }}>Air is</Text>
    //       <Text style={{ fontSize: 22, fontWeight: 600, marginBottom: 15 }}>GOOD</Text>
    //       <Text style={{ marginBottom: 30 }}>Breath deeply and enjoy the fresh, clean air around you.</Text>
    //     </View>
    //     <View style={{ borderBottomColor: '#BFD5DF', borderBottomWidth: 1, marginBottom: 15 }}></View>
    //     <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
    //       <View style={{flexDirection: "row"}}>
    //         <View style={{marginRight:16}}>
    //           <Text>US AQI</Text>
    //           <Text style={{ textAlign: 'center', fontWeight: 500, fontSize: 18 }}>{aqi}</Text>
    //         </View>
    //         <View style={{ justifyContent: "flex-start" }}>
    //           <Text>CN AQI</Text>
    //           <Text style={{ textAlign: 'center', fontWeight: 500, fontSize: 18 }}>{aqi}</Text>
    //         </View>
    //       </View>

    //       <View style={{ alignSelf: 'flex-end' }}>
    //         <Text style={{textAlign:"right"}}>Address</Text>
    //         <Text style={{textAlign:"right",color:"#A2A6AA"}}>Khon Kaen, Thailand</Text>
    //       </View>
    //     </View>
    //   </BlurView>
    // </View>
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
