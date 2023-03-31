import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

const SECRET_API_KEY = "696a49a5-7001-4cd5-98eb-b88cbde9cbc8";

export default function HomeScreen() {
  const [location, setLocation] = useState(null);
  const [aqi, setAqi] = useState(null);
  const [countries, setCountries] = useState(null);
  const [states, setStates] = useState(null);
  const [cities, setCities] = useState(null);

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
  };

  return (
    <View style={styles.container}>
      {location && (
        <View style={styles.box}>
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