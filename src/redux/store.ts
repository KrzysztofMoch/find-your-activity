import { combineReducers, configureStore } from "@reduxjs/toolkit";
import optionsSlice from "./optionsSlice";

const store = configureStore({
  reducer: {
    options: optionsSlice,
  }
})

const rootReducer = combineReducers({
  options: optionsSlice,
})

export type RootReducer = ReturnType<typeof rootReducer>
export default store;