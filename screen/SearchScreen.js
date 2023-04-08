import React, { useState, useEffect }  from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import Dropdown from './component/Dropdown';

const SECRET_API_KEY = "696a49a5-7001-4cd5-98eb-b88cbde9cbc8";

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
      })
      .catch(error => {
        console.log(error);
        alert('Failed to fetch air quality data');
      });
  };

  useEffect(() => {
   setSelectedCountry(null);
   setSelectedState(null);
   setSelectedCity(null);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Air Quality</Text>
      <Dropdown 
        onSelectCountry={setSelectedCountry} 
        onSelectState={setSelectedState} 
        onSelectCity={setSelectedCity} 
      />
      {selectedCity && (
        <Button title="Search" onPress={fetchAqiData} />
      )}
      <Text>{selectedCountry}, {selectedState}, {selectedCity}</Text>
      {aqiData && (
        <>
          <Text>Air Quality Index: {aqiData.data.current.pollution.aqius}</Text>
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