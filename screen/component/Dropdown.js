import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const API_KEY = '696a49a5-7001-4cd5-98eb-b88cbde9cbc8';
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
      <Text>Select Country:</Text>
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
        style={{ width: 200, height: 'auto' }} 
      >
        <Picker.Item label="Select a country" value="" />
        {countries.map((item) => (
          <Picker.Item label={item} value={item} key={item} />
        ))}
      </Picker>
      {selectedCountry && (
        <>
          <Text>Select State:</Text>
          <Picker
            selectedValue={selectedState}
            onValueChange={(value) => {
              setSelectedState(value);
              setSelectedCity('');
              setCities([]);
              onSelectState(value);
            }}
            style={{ width: 200, height: 'auto' }}
          >
            <Picker.Item label="Select a state" value="" />
            {states.map((item) => (
              <Picker.Item label={item} value={item} key={item} />
            ))}
          </Picker>
        </>
      )}
      {selectedState && (
        <>
          <Text>Select City:</Text>
          <Picker
            selectedValue={selectedCity}
            onValueChange={(value) => {
              setSelectedCity(value)
              onSelectCity(value);
            }}
            style={{ width: 200, height: 'auto' }}
          >
            <Picker.Item label="Select a city" value="" />
            {cities.map((item) => (
              <Picker.Item label={item} value={item} key={item} />
            ))}
          </Picker>
        </>
      )}
    </View>
  );
};

export default Dropdown;
