import React, { useState }  from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const SECRET_API_KEY = "696a49a5-7001-4cd5-98eb-b88cbde9cbc8";

export default function SearchScreen() {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [aqiData, setAqiData] = useState(null);

  const fetchAqiData = () => {
    const url = `http://api.airvisual.com/v2/city?city=${city}&state=${state}&country=${country}&key=${SECRET_API_KEY}`;

    axios.get(url)
      .then(response => {
        setAqiData(response.data);
      })
      .catch(error => {
        console.log(error);
        alert('Failed to fetch air quality data');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Air Quality</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city"
        onChangeText={text => setCity(text)}
        value={city}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter state"
        onChangeText={text => setState(text)}
        value={state}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter country"
        onChangeText={text => setCountry(text)}
        value={country}
      />
      <Button title="Search" onPress={fetchAqiData} />
      {aqiData && (
        <View style={styles.aqiData}>
          <Text style={styles.aqiTitle}>Air Quality Index: {aqiData.data.current.pollution.aqius}</Text>
        </View>
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