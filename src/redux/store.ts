import { combineReducers, configureStore } from '@reduxjs/toolkit';
import optionsSlice from './optionsSlice';
import responseSlice from './dataSlice';

const store = configureStore({
  reducer: {
    options: optionsSlice,
    data: responseSlice,
  },
});

const rootReducer = combineReducers({
  options: optionsSlice,
  data: responseSlice,
});

export type RootReducer = ReturnType<typeof rootReducer>;
export default store;
