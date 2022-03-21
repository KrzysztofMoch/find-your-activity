import React, {
  useEffect, 
  useRef, 
  useState 
} from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useDispatch, useSelector } from 'react-redux'
import { Slider } from '@miblanchard/react-native-slider';
import DropDownPicker from 'react-native-dropdown-picker';
import { ScrollView } from 'react-native-gesture-handler';

import APP_COLORS from '../../common/colors';
import { RootReducer } from '../../redux/store'
import { 
  setAccessibility, 
  setActivityType, 
  setParticipants, 
  setPrice 
} from '../../redux/optionsSlice';
import activity from '../../types/activity';
import IconButton from '../IconButton/IconButton';
import getColor from '../../common/getColor';
import getDifficultyText from '../../common/getDifficultyString';
import getPriceText from '../../common/getPriceString';

const OptionsBottomSheet = () => {

  const MIN_HEIGHT = '8%';
  const MAX_HEIGHT = '70%';

  const [isActivityMenuOpen, setIsActivityMenuOpen] = useState<boolean>(false);
  const [showBackground, setShownBackground] = useState<boolean>(false);

  // ------------------------- Redux -------------------------

  const dispatch = useDispatch()
  const options = useSelector((state: RootReducer) => state.options)

  // ------------------------- Utilities -------------------------

  const bottomSheetRef = useRef<BottomSheet>(null);

  // ------------------------- Render Functions -------------------------

  const renderActivityTypeSelection = () => {
    
    const [items, setItems] = useState<Array<{label: string, value: activity}>>(
      [
        {label: 'Education', value: 'education' },
        {label: 'Recreational', value: 'recreational' },
        {label: 'Social', value: 'social' },
        {label: 'Diy', value: 'diy' },
        {label: 'Charity', value: 'charity' },
        {label: 'Cooking', value: 'cooking' },
        {label: 'Relaxation', value: 'relaxation' },
        {label: 'Music', value: 'music' },
        {label: 'Busywork', value: 'busywork' },
      ]
    )
    const [value, setValue] = useState<Array<activity>>(options.activityType);

    useEffect(() => {
      dispatch(setActivityType(value))
    }, [value])

    // ------------------------- Render Functions -------------------------
    return(
      <View style={styles.dropDownPickerContainer}>
        <Text style={styles.dropDownPickerTitle}>Activity Types</Text>
        <DropDownPicker
          closeOnBackPressed
          items={items}
          multiple
          min={0}
          max={9}
          mode='BADGE'
          open={isActivityMenuOpen}
          style={styles.dropDownPicker}
          setItems={setItems}
          setOpen={setIsActivityMenuOpen}
          // @ts-ignore - lib TS issue 
          setValue={setValue}
          theme='DARK'
          showBadgeDot={false}
          value={options.activityType}
        />
      </View>
    )
  }

  const renderAccessibilitySlider = () => {
    const [stringValue, setStringValue] = useState<string>("Easy")
    const [sliderColor, setSliderColor] = useState<string>("green")

    useEffect(() => {
      setStringValue(getDifficultyText(options.accessibility))
      setSliderColor(getColor(options.accessibility))
    }, [])

    // ------------------------- Handlers -------------------------

    const onValueChange = (value: number|number[]) => {
      const newValue = Array.isArray(value) ? value[0] : value

      dispatch(setAccessibility(newValue))

      setStringValue(getDifficultyText(newValue))
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

    // ------------------------- Render Functions -------------------------
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

  const renderPriceSlider = () => {
    const [stringValue, setStringValue] = useState<string>("Free")
    const [sliderColor, setSliderColor] = useState<string>("green")

    useEffect(() => {
      setStringValue(getPriceText(options.price))
      setSliderColor(getColor(options.price))
    }, [])

    // ------------------------- Handlers -------------------------

    const onValueChange = (value: number|number[]) => {
      const newValue = Array.isArray(value) ? value[0] : value

      dispatch(setPrice(newValue))

      setStringValue(getPriceText(newValue))
      setSliderColor(getColor(newValue))  
    }
    
    // ------------------------- Render Functions -------------------------
    return (
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderText}>{`Price: ${stringValue}`}</Text>
        <Slider
          thumbTintColor={APP_COLORS.black}
          minimumTrackTintColor={sliderColor}
          value={options.price}
          onValueChange={value => onValueChange(value)}
          trackClickable={false}
        />
      </View>
    )
  }

  const renderParticipantsSettings = () => {

    // ------------------------- Handlers -------------------------

    const handlePress = (add: boolean) => {
      const value = add ? 1 : -1;
      const newValue = options.participants + value;

      if(newValue >= 1)
        dispatch(setParticipants(newValue))
    }

    // ------------------------- Render Functions -------------------------
    return(
      <View style={styles.participantsSettingsContainer}>
        <IconButton name='remove-circle-outline' size={36} onPress={() => handlePress(false)} />
        <Text style={styles.participantsSettingsText}>{`Count of participants ${options.participants}`}</Text>
        <IconButton name='add-circle-outline' size={36} onPress={() => handlePress(true)} />
      </View>
    )
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={[MIN_HEIGHT, MAX_HEIGHT]}
      onChange={index => { setShownBackground(index !== 0)}}
      backgroundStyle={styles.holderStyle}
      handleIndicatorStyle={{backgroundColor: APP_COLORS.white}}
      enableContentPanningGesture={false}
    >
      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.containerContent}
      >
        <Text style={styles.title}>Options</Text>
        {renderActivityTypeSelection()}
        {renderAccessibilitySlider()}
        {renderPriceSlider()}
        {renderParticipantsSettings()}
      </ScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.darkBlue,
  },
  containerContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  holderStyle: {
    backgroundColor: APP_COLORS.darkBlue,
  },
  dropDownPicker: {
    width: '100%', 
  },
  dropDownPickerContainer: {
    width: '90%',
    marginBottom: 18,
  },
  dropDownPickerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: "500",
    letterSpacing: 1,
    marginBottom: 5,
  },
  participantsSettingsContainer: {
    width: '90%',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  participantsSettingsText: {
    color: APP_COLORS.white,
    fontSize: 22,
    fontWeight: "600",
    letterSpacing: 1,
  },
  sliderContainer: {
    width: '80%',
    marginVertical: 2,
  },
  sliderText: {
    color: 'white',
    fontSize: 20,
    fontWeight: "500",
    letterSpacing: 1,
  },
  title: {
    color: APP_COLORS.white,
    fontSize: 22,
    fontWeight: "600",
    letterSpacing: 1,
    marginBottom: 20,
  }, 
});

export default OptionsBottomSheet;