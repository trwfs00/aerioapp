import React from 'react';
import firebase from 'firebase/compat/app';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { View, Text, Button } from 'react-native';

export default function ProfileScreen() {
  return (
    <View>
      <Text>Profile Screen</Text>
      <Button
        title="Sign Out"
        color="#0a86ff"
        onPress={() => {getAuth().signOut()}}
        style={{marginTop: 270}}
      />
    </View>
  );
}

