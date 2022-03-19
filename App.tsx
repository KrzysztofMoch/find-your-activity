import React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import MainScreen from './src/screens/MainScreen/MainScreen';
import SettingsScreen from './src/screens/SettingsScreen/SettingsScreen';
import IconButton from './src/components/SettingsButton/SettingsButton';

const Navigation = createNativeStackNavigator();

const App = () => (
  <View style={{ flex: 1 }}>
    <NavigationContainer>
      <Navigation.Navigator initialRouteName='MainScreen'>
        <Navigation.Screen name='MainScreen' component={MainScreen} options={mainScreenOptions} />
        <Navigation.Screen name='SettingsScreen' component={SettingsScreen} options={settingsScreenOptions} />
      </Navigation.Navigator>
    </NavigationContainer>
  </View>
);

// ------------------------- Screen Options -------------------------

const mainScreenOptions: NativeStackNavigationOptions = {
  title: 'Home',
  headerTitleAlign: 'center',
  headerRight: () => <IconButton name='ios-settings-sharp' size={32} style={{}} navigateTo='SettingsScreen' />
}

const settingsScreenOptions: NativeStackNavigationOptions = {
  title: 'Settings',
  headerTitleAlign: 'center',
}

export default App;

