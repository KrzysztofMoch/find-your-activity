import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useDispatch, useSelector } from "react-redux";

import APP_COLORS from "../../common/colors";
import { setActivityType } from "../../redux/optionsSlice";
import { RootReducer } from "../../redux/store";
import activity from "../../types/activity";

const ActivityTypeOption = () => {

  const dispatch = useDispatch()
  const options = useSelector((state: RootReducer) => state.options)

  const [value, setValue] = useState<Array<activity>>(options.activityType)
  const [isOpen, setIsOpen] = useState<boolean>(false);
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

  useEffect(() => {
      dispatch(setActivityType(value))
  }, [dispatch, value])

  // ------------------------- Render Functions -------------------------
  return(
    <View style={styles.activityDropDownContainer}>
      <Text style={styles.activityDropDownTitle}>Activity Types</Text>
      <DropDownPicker
        closeOnBackPressed
        items={items}
        multiple
        min={1}
        max={9}
        mode='BADGE'
        open={isOpen}
        containerStyle={styles.dropDownContent}
        setItems={setItems}
        setOpen={setIsOpen}
        // @ts-ignore - lib TS issue 
        setValue={setValue}
        theme='DARK'
        showBadgeDot={false}
        value={value}
      />
      <Text style={styles.description}>
        Select what type of activity you want to view
      </Text>
    </View>
  )
}


const styles = StyleSheet.create({
  activityDropDownContainer: {
      width: '85%',
      marginBottom: 18,
    },
  activityDropDownTitle: {
    color: 'white',
      fontSize: 18,
      fontWeight: "500",
      letterSpacing: 1,
      marginBottom: 5,
    },
    dropDownContent: {
      width: '100%',
      zIndex: 100, 
  },
  description: {
    marginTop: 10,
    padding: 5,
    color: APP_COLORS.white,
    opacity: 0.5,
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
})

export default ActivityTypeOption;