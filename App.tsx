import React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import MainScreen from './src/screens/MainScreen/MainScreen';
import SettingsScreen from './src/screens/SettingsScreen/SettingsScreen';
import IconButton from './src/components/IconButton/IconButton';
import APP_COLORS from './src/common/colors';

const Navigation = createNativeStackNavigator();

const App = () => (
  <View style={{ flex: 1 }}>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Navigation.Navigator initialRouteName='MainScreen' screenOptions={defaultScreenOptions}>
          <Navigation.Screen name='MainScreen' component={MainScreen} options={mainScreenOptions} />
          <Navigation.Screen name='SettingsScreen' component={SettingsScreen} options={settingsScreenOptions} />
        </Navigation.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  </View>
);

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

export default App;

