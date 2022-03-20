import React, {
  useEffect, 
  useMemo, 
  useRef, 
  useState 
} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useDispatch, useSelector } from 'react-redux'
import { Slider } from '@miblanchard/react-native-slider';

import APP_COLORS from '../../common/colors';
import { RootReducer } from '../../redux/store'
import { 
  setAccessibility, 
  setActivityType, 
  setParticipants, 
  setPrice 
} from '../../redux/optionsSlice';

const OptionsBottomSheet = () => {

  const MIN_HEIGHT = '8%';
  const MAX_HEIGHT = '70%';

  // ------------------------- Redux -------------------------

  const dispatch = useDispatch()
  const options = useSelector((state: RootReducer) => state.options)

  // ------------------------- Utilities -------------------------

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => [MIN_HEIGHT, MAX_HEIGHT], []);

  // ------------------------- Render Functions -------------------------

  const renderAccessibilitySlider = () => {
    const [stringValue, setStringValue] = useState<string>("Easy")
    const [sliderColor, setSliderColor] = useState<string>("green")

    useEffect(() => {
      setStringValue(getStringValue(options.accessibility))
      setSliderColor(getColor(options.accessibility))
    }, [])

    // ------------------------- Handlers -------------------------

    const onValueChange = (value: number|number[]) => {
      const newValue = Array.isArray(value) ? value[0] : value

      dispatch(setAccessibility(newValue))

      setStringValue(getStringValue(newValue))
      setSliderColor(getColor(newValue))  
    }

    const getColor = (value: number): string => {
      if (value > 0.75){
        return "red"
      } 
      if (value > 0.40) {
        return "orange"
      } 
      if (value > 0.15) {
        return "yellow"
      } 
      
      return "green"
    }

    const getStringValue = (value: number): string => {
      if (value > 0.75){
        return 'Very Hard'
      } 
      if (value > 0.40) {
        return 'Hard'
      } 
      if (value > 0.15) {
        return 'Normal'
      } 
      
      return 'Easy'
    }
    
    // ------------------------- Redner Functions -------------------------
    return (
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderText}>{`difficulty: ${stringValue}`}</Text>
        <Slider
          thumbTintColor={APP_COLORS.black}
          minimumTrackTintColor={sliderColor}
          value={options.accessibility}
          onValueChange={value => onValueChange(value)}
        />
      </View>
    )
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      // onChange={handleSheetChanges}
      backgroundStyle={{backgroundColor: APP_COLORS.lightNightBlue}}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Options</Text>
        {renderAccessibilitySlider()}
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: APP_COLORS.lightNightBlue
  },
  title: {
    color: APP_COLORS.white,
    fontSize: 22,
    fontWeight: "600",
    letterSpacing: 1,
    marginBottom: 20,
  },
  sliderContainer: {
    width: '80%',
  },
  sliderText: {
    color: 'white',
    fontSize: 20,
    fontWeight: "500",
    letterSpacing: 1,
  }
});

export default OptionsBottomSheet;