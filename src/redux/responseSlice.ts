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
}

const initialState = { 
  accessibility: 0.05,
  activityType: 'cooking',
  activity: "Learn a new recipe",
  participants: 1,
  price: 0,
  key: 5808228,
} as SliceType

const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    setData(state, action: PayloadAction<SliceType>) {
        state = action.payload
    }
  }
})

export const { setData } = optionsSlice.actions
export default optionsSlice.reducer