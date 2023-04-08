import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const API_KEY = 'df43a3f1-23cd-485e-a31a-2ef59b5eced5';
const BASE_URL = 'http://api.airvisual.com/v2';

const Dropdown = ({ onSelectCountry, onSelectState, onSelectCity }) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    // Fetch the list of supported countries
    fetch(`${BASE_URL}/countries?key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.data.map((item) => item.country));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    // Fetch the list of supported states in the selected country
    if (selectedCountry) {
      fetch(`${BASE_URL}/states?country=${selectedCountry}&key=${API_KEY}`)
        .then((response) => response.json())
        .then((data) => {
          setStates(data.data.map((item) => item.state));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedCountry]);

  useEffect(() => {
    // Fetch the list of supported cities in the selected state
    if (selectedState) {
      fetch(`${BASE_URL}/cities?state=${selectedState}&country=${selectedCountry}&key=${API_KEY}`)
        .then((response) => response.json())
        .then((data) => {
          setCities(data.data.map((item) => item.city));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedState]);

  return (
    <View>
      <View style={styles.borderRadius}>
        <Picker
          selectedValue={selectedCountry}
          onValueChange={(value) => {
            setSelectedCountry(value);
            setSelectedState('');
            setSelectedCity('');
            setStates([]);
            setCities([]);
            onSelectCountry(value);
          }}
          style={styles.picker}
        >
          <Picker.Item label="Select a country" value="" />
          {countries.map((item) => (
            <Picker.Item label={item} value={item} key={item} />
          ))}
        </Picker>
      </View>
      {selectedCountry && (
        <>
          <View style={styles.borderRadius}>
            <Picker
              selectedValue={selectedState}
              onValueChange={(value) => {
                setSelectedState(value);
                setSelectedCity('');
                setCities([]);
                onSelectState(value);
              }}
              style={styles.picker}
            >
              <Picker.Item label="Select a state" value="" />
              {states.map((item) => (
                <Picker.Item label={item} value={item} key={item} />
              ))}
            </Picker>
          </View>
        </>
      )}
      {selectedState && (
        <>
          <View style={styles.borderRadius}>
            <Picker
              selectedValue={selectedCity}
              onValueChange={(value) => {
                setSelectedCity(value)
                onSelectCity(value);
              }}
              style={styles.picker}
            >
              <Picker.Item label="Select a city" value="" />
              {cities.map((item) => (
                <Picker.Item label={item} value={item} key={item} />
              ))}
            </Picker>
          </View>
        </>
      )}
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  picker: {
    fontSize: 16,
    borderRadius: 40,
    padding: 10,
    backgroundColor: "white",
    color: "black",
  },
  borderRadius: {
    borderRadius: 50,
    overflow: 'hidden',
    marginVertical: 6,
  }
})