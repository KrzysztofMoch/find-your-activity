import React, {
  useEffect, 
  useRef, 
  useState 
} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useDispatch } from 'react-redux'
import DropDownPicker from 'react-native-dropdown-picker';

import APP_COLORS from '../../common/colors';
import { setSearchOption } from '../../redux/optionsSlice';
import filterOption from '../../types/seacrhOption';
import ActivityTypeOption from '../optionsComponents/ActivityTypeOption'
import ParticipantsOption from '../optionsComponents/ParticipantsOption';
import AccessibilityOption from '../optionsComponents/AccessibilityOption';
import AccessibilityRangeOption from '../optionsComponents/AccessibilityRangeOption';
import PriceRangeOption from '../optionsComponents/PriceRangeOption';
import PriceOption from '../optionsComponents/PriceOption';


const OptionsBottomSheet = () => {

  const MIN_HEIGHT = '8%';
  const MAX_HEIGHT = '60%';

  const dispatch = useDispatch()
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [filterBy, setFilterBy] = useState<filterOption>(filterOption.ACTIVITY_TYPE)

  useEffect(() => {
    dispatch(setSearchOption(filterBy))
  }, [dispatch, filterBy])

  // ------------------------- Render Functions -------------------------

  const renderOptionChose = () => {
    
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [items, setItems] = useState<Array<{label: string, value: filterOption}>>(
      [
        {label: 'Activity Type', value: filterOption.ACTIVITY_TYPE },
        {label: 'Participants', value: filterOption.PARTICIPANTS },
        {label: 'Accessibility', value: filterOption.ACCESSIBILITY },
        {label: 'Accessibility Range', value: filterOption.ACCESSIBILITY_RANGE },
        {label: 'Price', value: filterOption.PRICE },
        {label: 'Price Range', value: filterOption.PRICE_RANGE },
      ]
    )

    // ------------------------- Render Functions -------------------------
    return(
      <View style={styles.optionChoseDropDownContainer}>
        <Text style={styles.optionChoseDropDownTitle}>Filter By:</Text>
        <DropDownPicker
          multiple={false}
          closeOnBackPressed
          items={items}
          mode='BADGE'
          open={isOpen}
          style={{}}
          containerStyle={styles.optionChoseDropDown}
          setItems={setItems}
          setOpen={setIsOpen}
          // @ts-ignore - lib TS issue 
          setValue={setFilterBy}
          theme='DARK'
          showBadgeDot={false}
          value={filterBy}
        />
      </View>
    )
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={[MIN_HEIGHT, MAX_HEIGHT]}
      backgroundStyle={styles.holderStyle}
      handleIndicatorStyle={{backgroundColor: APP_COLORS.white}}
      enableContentPanningGesture={false}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Options</Text>
        {renderOptionChose()}
        {filterBy === filterOption.ACTIVITY_TYPE && <ActivityTypeOption />}
        {filterBy === filterOption.PARTICIPANTS && <ParticipantsOption />}
        {filterBy === filterOption.ACCESSIBILITY && <AccessibilityOption />}
        {filterBy === filterOption.ACCESSIBILITY_RANGE && <AccessibilityRangeOption />}
        {filterBy === filterOption.PRICE && <PriceOption />}
        {filterBy === filterOption.PRICE_RANGE && <PriceRangeOption />}
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.darkBlue,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  holderStyle: {
    backgroundColor: APP_COLORS.darkBlue,
  },
  optionChoseDropDown: {
    width: '75%',
  },
  optionChoseDropDownContainer: {
    width: '90%',
    marginBottom: 18,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionChoseDropDownTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: "500",
    letterSpacing: 1,
    marginBottom: 5,
    marginRight: 10,
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