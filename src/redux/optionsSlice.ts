/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import activity from "../types/activity"
import searchOption from "../types/seacrhOption"

interface OptionsSliceType {
  accessibilityMax: number,
  accessibilityMin: number,
  priceMax: number,
  priceMin: number,
  participants: number,
  activityType: Array<activity>,
  searchOption: searchOption,
}

const initialState = { 
  accessibilityMax: 1,
  accessibilityMin: 0,
  priceMax: 1,
  priceMin: 0,
  participants: 1,
  activityType: ['recreational'],
  searchOption: searchOption.ACTIVITY_TYPE
} as OptionsSliceType

const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    setAccessibility(state, action: PayloadAction<number>) {
      state.accessibilityMax = action.payload;
      state.accessibilityMin = 0;
    },
    setAccessibilityMax(state, action: PayloadAction<number>) {
      state.accessibilityMax = action.payload;
    },
    setAccessibilityMin(state, action: PayloadAction<number>) {
      state.accessibilityMin = action.payload;
    },
    setPrice(state, action: PayloadAction<number>){
      state.priceMax = action.payload;
      state.priceMin = 0;
    },
    setPriceMax(state, action: PayloadAction<number>){
      state.priceMax = action.payload;
    },
    setPriceMin(state, action: PayloadAction<number>){
      state.priceMin = action.payload;
    },
    setActivityType(state, action: PayloadAction<Array<activity>>){
      state.activityType = action.payload;
    },
    setParticipants(state, action: PayloadAction<number>){
      state.participants = action.payload;
    },
    setSearchOption(state, action: PayloadAction<number>) {
      state.searchOption = action.payload;
    },
  }
})

export const {
  setAccessibility,
  setAccessibilityMax,
  setAccessibilityMin,
  setPrice,
  setPriceMax, 
  setPriceMin,  
  setActivityType, 
  setParticipants,
  setSearchOption,
} = optionsSlice.actions
export type { OptionsSliceType }
export default optionsSlice.reducer