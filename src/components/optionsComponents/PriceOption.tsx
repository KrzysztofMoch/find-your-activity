import { Slider } from '@miblanchard/react-native-slider';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import APP_COLORS from '../../common/colors';
import getColor from '../../common/getColor';
import getPriceText from '../../common/getPriceString';
import { setAccessibility } from '../../redux/optionsSlice';
import { RootReducer } from '../../redux/store';

const AccessibilityOption = () => {
  const dispatch = useDispatch();
  const options = useSelector((state: RootReducer) => state.options);

  const [stringValue, setStringValue] = useState<string>('Expensive');
  const [sliderColor, setSliderColor] = useState<string>('green');
  const [value, setValue] = useState<number>(options.accessibilityMax);

  useEffect(() => {
    setStringValue(getPriceText(value));
    setSliderColor(getColor(value));

    dispatch(setAccessibility(parseFloat(value.toFixed(2))));
  }, [dispatch, value]);

  // ------------------------- Render Functions -------------------------

  return (
    <View style={styles.sliderContainer}>
      <Text style={styles.sliderText}>{`Price: ${stringValue}`}</Text>
      <Slider
        thumbTintColor={APP_COLORS.black}
        minimumTrackTintColor={sliderColor}
        value={value}
        onValueChange={(value) => setValue(Array.isArray(value) ? value[0] : value)}
      />
      <Text style={styles.description}>Select activity cost</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  description: {
    marginTop: 10,
    padding: 5,
    color: APP_COLORS.white,
    opacity: 0.5,
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
  sliderContainer: {
    width: '80%',
    marginVertical: 2,
  },
  sliderText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 1,
  },
});

export default AccessibilityOption;
