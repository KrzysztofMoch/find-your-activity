import { Slider } from "@miblanchard/react-native-slider"
import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { useDispatch, useSelector } from "react-redux"

import APP_COLORS from "../../common/colors"
import getColor from "../../common/getColor"
import getTextPrice from "../../common/getPriceString"
import { setPriceMin, setPriceMax } from "../../redux/optionsSlice"
import { RootReducer } from "../../redux/store"

const PriceRangeOption = () => {
  const dispatch = useDispatch()
  const options = useSelector((state: RootReducer) => state.options)
  
  const [stringValue, setStringValue] = useState<Array<string>>(['Cheap', 'Very Expensive'])
  const [sliderColor, setSliderColor] = useState<string>("green")
  const [value, setValue] = useState<Array<number>>([
    options.priceMin,
    options.priceMax * 100,
  ])

  // valueMin - 0, valueMax - 1

  useEffect(() => {
    const fixedMaxValue = parseFloat((value[1] / 100).toFixed(2))
    const fixedMinValue = parseFloat((value[0]).toFixed(2))

    setStringValue([getTextPrice(fixedMinValue), getTextPrice(fixedMaxValue)])
    setSliderColor(getColor(fixedMaxValue))
    
    dispatch(setPriceMin(fixedMinValue))
    dispatch(setPriceMax(fixedMaxValue))  
  }, [dispatch, value])

  // ------------------------- Render Functions -------------------------
  return (
    <View style={styles.sliderContainer}>
      <Text style={styles.sliderText}>{`Price Range:\n${stringValue.join(' - ')}`}</Text>
      <Slider
        thumbTintColor={APP_COLORS.black}
        minimumTrackTintColor={sliderColor}
        minimumValue={0}
        maximumValue={100}
        value={value}
        step={2}
        onValueChange={newValue => setValue(Array.isArray(newValue) ? newValue : value)}
      />
      <Text style={styles.description}>
        Activity cost range
      </Text>
    </View>
  )
}

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
    fontWeight: "500",
    letterSpacing: 1,
  },
})

export default PriceRangeOption;