/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import activity from "../types/activity"

interface SliceType {
  accessibility: number,
  activityType: activity,
  participants: number,
  price: number,
  key: number,
}

const initialState = { 
  accessibility: 0,
  activityType: "recreational",
  participants: 0,
  price: 0,
} as SliceType

const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    setAccessibility(state, action: PayloadAction<number>) {
      state.accessibility = action.payload;
    },
    setActivityType(state, action: PayloadAction<activity>){
      state.activityType = action.payload;
    },
    setParticipants(state, action: PayloadAction<number>){
      state.participants = action.payload;
    },
    setPrice(state, action: PayloadAction<number>){
      state.price = action.payload;
    },
  }
})

export const {
  setAccessibility, 
  setActivityType, 
  setParticipants, 
  setPrice,
} = optionsSlice.actions
export default optionsSlice.reducer