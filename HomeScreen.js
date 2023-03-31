import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

const _01d = require('./assets/icon/01d.png');
const _01n = require('./assets/icon/01n.png');
const _02d = require('./assets/icon/02d.png');
const _02n = require('./assets/icon/02n.png');
const _03d = require('./assets/icon/03d.png');
const _04d = require('./assets/icon/04d.png');
const _09d = require('./assets/icon/09d.png');
const _10d = require('./assets/icon/10d.png');
const _10n = require('./assets/icon/10n.png');
const _11d = require('./assets/icon/11d.png');
const _13d = require('./assets/icon/13d.png');
const _50d = require('./assets/icon/50d.png');


const SECRET_API_KEY = "696a49a5-7001-4cd5-98eb-b88cbde9cbc8";

export default function HomeScreen() {
  const [location, setLocation] = useState(null);
  const [aqi, setAqi] = useState(null);
  const [countries, setCountries] = useState(null);
  const [states, setStates] = useState(null);
  const [cities, setCities] = useState(null);
  const [weather, setWeather] = useState(null);
  const [icon, setIcon] = useState(null);

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

  const getNearestCityData = async (latitude, longitude) => {
    const response = await axios.get(`http://api.airvisual.com/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=${SECRET_API_KEY}`);
    const nearestCity = response.data.data;
    setAqi(nearestCity.current.pollution.aqius);
    setCountries(nearestCity.country);
    setStates(nearestCity.state);
    setCities(nearestCity.city);
    setWeather(nearestCity.current.weather.tp)
    setIcon(nearestCity.current.weather.ic)
  };

  return (
    <View style={styles.container}>
      {location && (
        <View style={styles.box}>
          <Image source={getImageSource(icon)} style={{ width: 50, height: 50 , margin: 16,}} />
          <Text style={styles.text}>AQI: {aqi}</Text>
          <Text style={styles.text}>{states}, {countries}</Text>
          <Text style={styles.sub_text}>{cities}</Text>
        </View>
      )}
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
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sub_text: {
    marginTop: 12,
    fontSize: 12,
    fontWeight: 'normal',
  },
});