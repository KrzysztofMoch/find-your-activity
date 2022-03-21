import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import APP_COLORS from '../../common/colors'

const SettingsScreen = () => {
  
  // ------------------------- Render Functions -------------------------

  return (
    <View style={styles.container}>
      <Text>SettingsScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.nightBlue,
  }
})

export default SettingsScreen;