/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import activity from "../types/activity"

interface SliceType {
  accessibility: number,
  activityType: activity|'',
  activity: string,
  participants: number,
  price: number,
  key: number,
  showProperties: boolean,
}

const initialState = { 
  accessibility: 0.05,
  activityType: 'cooking',
  activity: "Learn a new recipe",
  participants: 1,
  price: 0,
  key: 5808228,
  showProperties: false,
} as SliceType

const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    setData(state, action: PayloadAction<SliceType>) {
        return action.payload
    },
    setShowProperties(state, action: PayloadAction<boolean>) {
      state.showProperties = action.payload
    }
  }
})

export const { setData, setShowProperties } = optionsSlice.actions
export default optionsSlice.reducer