import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';

import MainScreen from '../screens/MainScreen/MainScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import IconButton from '../components/IconButton/IconButton';
import APP_COLORS from '../common/colors';

const Navigation = createNativeStackNavigator();

const MainNavigation = () => (
  <NavigationContainer>
    <Navigation.Navigator initialRouteName='MainScreen' screenOptions={defaultScreenOptions}>
      <Navigation.Screen name='MainScreen' component={MainScreen} options={mainScreenOptions} />
      <Navigation.Screen name='SettingsScreen' component={SettingsScreen} options={settingsScreenOptions} />
    </Navigation.Navigator>
  </NavigationContainer>
)

// ------------------------- Screen Options -------------------------

const defaultScreenOptions: NativeStackNavigationOptions = {
  headerTitleAlign: 'center',
  headerTintColor: APP_COLORS.white,
  headerStyle: {
    backgroundColor: APP_COLORS.black,
  }
}
  
const mainScreenOptions: NativeStackNavigationOptions = {
  title: 'Home',
  headerRight: () => <IconButton name='ios-settings-sharp' size={32} style={{}} navigateTo='SettingsScreen' />,
}
  
const settingsScreenOptions: NativeStackNavigationOptions = {
  title: 'Settings',
}

export default MainNavigation