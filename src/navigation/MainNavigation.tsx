import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import MainScreen from '../screens/MainScreen/MainScreen';
import AboutAppScreen from '../screens/AboutAppScreen/AboutAppScreen';
import IconButton from '../components/IconButton/IconButton';
import APP_COLORS from '../common/colors';

const Navigation = createNativeStackNavigator();

const MainNavigation = () => (
  <NavigationContainer>
    <Navigation.Navigator initialRouteName="MainScreen" screenOptions={defaultScreenOptions}>
      <Navigation.Screen name="MainScreen" component={MainScreen} options={mainScreenOptions} />
      <Navigation.Screen
        name="SettingsScreen"
        component={AboutAppScreen}
        options={settingsScreenOptions}
      />
    </Navigation.Navigator>
  </NavigationContainer>
);

// ------------------------- Screen Options -------------------------

const defaultScreenOptions: NativeStackNavigationOptions = {
  headerTitleAlign: 'center',
  headerTintColor: APP_COLORS.white,
  headerStyle: {
    backgroundColor: APP_COLORS.black,
  },
};

const mainScreenOptions: NativeStackNavigationOptions = {
  title: 'Home',
  headerRight: () => (
    <IconButton
      name="ios-information-circle-sharp"
      size={36}
      style={{}}
      navigateTo="SettingsScreen"
    />
  ),
};

const settingsScreenOptions: NativeStackNavigationOptions = {
  title: 'Settings',
};

export default MainNavigation;
