
import React from 'react';
import { SafeAreaView } from 'react-native';
import { HomeScreen } from './src/screens/HomeScreen';
import { styles } from './src/styles';

const App = () => {
  return (
    <SafeAreaView  style = { styles.bg }>
     <HomeScreen />
    </SafeAreaView>
  );
};

export default App;
