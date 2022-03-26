import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  Alert,
  DevSettings,
} from 'react-native';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Clipboard from '@react-native-clipboard/clipboard';
import NetInfo from '@react-native-community/netinfo';

import APP_COLORS from '../../common/colors';
import OptionsBottomSheet from '../../components/OptionsBottomSheet/OptionsBottomSheet';
import { RootReducer } from '../../redux/store';
import getPriceString from '../../common/getPriceString';
import getAccessibilityString from '../../common/getAccessibilityText';
import getColor from '../../common/getColor';
import ActivitySwiper from '../../components/ActivitySwiper/ActivitySwiper';

const MainScreen: React.FC = () => {
  // ------------------------- Redux -------------------------

  const data = useSelector((state: RootReducer) => state.data);

  // ------------------------- Render Functions -------------------------

  const renderActivityKey = () => {
    // ------------------------- Handlers -------------------------

    const handleOnPress = () => {
      Clipboard.setString(data.key.toString());
      Platform.select({
        android: ToastAndroid.showWithGravity('Copy to Clipboard', 1000, ToastAndroid.BOTTOM),
        default: Alert.prompt('Copied', 'Key has been copied'),
      });
    };

    // ------------------------- Render Functions -------------------------

    if (!data.showProperties) {
      return <View style={styles.activityKeyContainer} />;
    }

    return (
      <TouchableOpacity style={styles.activityKeyContainer} onPress={handleOnPress}>
        <Text style={styles.activityKey}>{`#${data.key}`}</Text>
      </TouchableOpacity>
    );
  };

  const renderActivityType = () => (
    <Text style={styles.activityPropertiesText}>
      Activity type:{' '}
      <Text style={[styles.activityPropertiesText, { margin: 0 }]}>
        {data.showProperties && data.activityType}
      </Text>
    </Text>
  );

  const renderAccessibility = () => (
    <Text style={styles.activityPropertiesText}>
      Accessibility:{' '}
      <Text
        style={[styles.activityPropertiesText, { margin: 0, color: getColor(data.accessibility) }]}
      >
        {data.showProperties && getAccessibilityString(data.accessibility)}
      </Text>
    </Text>
  );

  const renderPrice = () => (
    <Text style={styles.activityPropertiesText}>
      Price:{' '}
      <Text style={[styles.activityPropertiesText, { margin: 0, color: getColor(data.price) }]}>
        {data.showProperties && getPriceString(data.price)}
      </Text>
    </Text>
  );

  const renderCountOfParticipants = () => (
    <Text style={styles.activityPropertiesText}>
      {`Count of participants: ${data.showProperties ? data.participants : ''}`}
    </Text>
  );

  const renderActivityProperties = () => (
    <View style={styles.activityPropertiesContainer}>
      {renderActivityType()}
      {renderAccessibility()}
      {renderPrice()}
      {renderCountOfParticipants()}
    </View>
  );

  const renderActivitySwiper = () => <ActivitySwiper />;

  return (
    <View style={styles.container}>
      <View style={styles.activityViewContent}>
        {renderActivityKey()}
        {renderActivitySwiper()}
        {renderActivityProperties()}
      </View>
      <OptionsBottomSheet />
    </View>
  );
};

const styles = StyleSheet.create({
  activityViewContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  activityPropertiesContainer: {
    width: '90%',
    marginTop: 12,
    marginLeft: 12,
  },
  activityPropertiesText: {
    color: APP_COLORS.white,
    fontSize: 20,
    fontWeight: '500',
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
});

export default MainScreen;
