import React from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';

import store from './src/redux/store'
import MainNavigation from './src/navigation/MainNavigation';

const App = () => (
  <View style={{ flex: 1 }}>
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <MainNavigation />
      </GestureHandlerRootView>
    </Provider>
  </View>
);

export default App;

