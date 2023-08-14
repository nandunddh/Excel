// HomeScreen.js
import React from 'react';
import { View, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Button
        title="Open Excel Screen"
        onPress={() => navigation.navigate('Excel')}
      />
    </View>
  );
};

export default HomeScreen;
