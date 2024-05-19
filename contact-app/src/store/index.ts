import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import contactReducer from './contactSlice';

const store = configureStore({
  reducer: {
    contacts: contactReducer,
  },
  //middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
