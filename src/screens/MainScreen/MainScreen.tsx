import { 
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import APP_COLORS from '../../common/colors'
import OptionsBottomSheet from '../../components/OptionsBottomSheet/OptionsBottomSheet'
import { RootReducer } from '../../redux/store'
import getPriceString from '../../common/getPriceString'
import getDifficultyString from '../../common/getDifficultyString'
import getColor from '../../common/getColor'

const MainScreen: React.FC = () => {

  const [showProperties, setShowProperties] = useState<boolean>(true)

  // ------------------------- Redux -------------------------

  const dispatch = useDispatch()
  const data = useSelector((state: RootReducer) => state.data)

  // ------------------------- Render Functions -------------------------

  const renderActivityKey = () => {

    // ------------------------- Handlers -------------------------

    const handleOnPress = () => {
      // TODO: copy activity key to clipboard
    }

    // ------------------------- Render Functions -------------------------

    return(
      <TouchableOpacity 
        style={styles.activityKeyContainer}
        onPress={handleOnPress}
      >
        <Text style={styles.activityKey}>{`#${data.key}`}</Text>
      </TouchableOpacity>
    )
  }

  const renderActivity = () => (
    <ScrollView style={styles.activityContainer} contentContainerStyle={styles.activityContainerContent}>
      <Text style={styles.activityText}>{data.activity}</Text>
    </ScrollView>
  )

  const renderActivityProperties = () => (
    <View style={styles.activityPropertiesContainer}>
      <Text style={styles.activityPropertiesText}>
        {`Activity type: `}
        <Text style={[styles.activityPropertiesText, {margin: 0}]}>
          {showProperties && data.activityType}
        </Text>
      </Text>
      <Text style={styles.activityPropertiesText}>
        {`Difficulty: `}
        <Text 
          style={[styles.activityPropertiesText, {margin: 0, color: getColor(data.accessibility)}]}
        >
          {showProperties && getDifficultyString(data.accessibility)}
        </Text>
      </Text>
      <Text style={styles.activityPropertiesText}>
        {`Price: `}
        <Text 
          style={[styles.activityPropertiesText, {margin: 0, color: getColor(data.price)}]}
        >
          {showProperties && getPriceString(data.price)}
        </Text>
      </Text>
      <Text style={styles.activityPropertiesText}>
        {`Count of participants: ${showProperties && data.participants}`}
      </Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.activityView} 
        contentContainerStyle={styles.activityViewContent}
      >
        {renderActivityKey()}
        {renderActivity()}
        {renderActivityProperties()}
      </ScrollView>
      <OptionsBottomSheet />
    </View>
  )
}

const styles = StyleSheet.create({
  activityView: {
    flex: 1,
  },
  activityViewContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  activityText: {
    color: APP_COLORS.white,
    fontSize: 26,
    fontWeight: "500",
    letterSpacing: 0.7,
    maxHeight: '100%',
    textAlign: 'center',
  },
  activityContainer: {
    backgroundColor: APP_COLORS.lightNightBlue,
    width: '90%',
    height: 350,
    padding: 10,
    borderRadius: 10,
  },
  activityContainerContent: {
    justifyContent: 'center', 
    alignItems: 'center', 
    display: 'flex', 
    flex: 1
  },
  activityPropertiesContainer: {
    width: '90%',
    marginTop: 12,
    marginLeft: 12,
  },
  activityPropertiesText: {
    color: APP_COLORS.white,
    fontSize: 20,
    fontWeight: "500",
    letterSpacing: 0.7,
    marginVertical: 2,
  },
  activityKey: {
    fontSize: 36,
    color: '#ffffff',
    opacity: 0.7,
  },
  activityKeyContainer: {
    display: 'flex',
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.nightBlue,
  },
})

export default MainScreen;