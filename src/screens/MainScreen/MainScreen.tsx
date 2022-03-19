import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import APP_COLORS from '../../common/colors'
import OptionsBottomSheet from '../../components/OptionsBottomSheet/OptionsBottomSheet'
import { RootReducer } from '../../redux/store'

const MainScreen: React.FC = () => {

  // ------------------------- Render Functions -------------------------

  return (
    <View style={styles.container}>
      <OptionsBottomSheet />
      <Text>MainScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.nightBlue,
  }
})

export default MainScreen;