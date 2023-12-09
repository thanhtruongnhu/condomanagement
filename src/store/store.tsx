import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import aptTypeSlice from './aptTypeSlice';
import inquirySlice from './inquirySlice';
import applicationSlice from './applicationSlice';
import waitlistSlice from './waitlistSlice';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
};

// Combine reducers
const rootReducer = combineReducers({
  aptTypeData: aptTypeSlice,
  inquiryData: inquirySlice,
  applicationData: applicationSlice,
  waitlistData: waitlistSlice,
});

// Enhanced reducer with persistence capability
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer
const store = configureStore({
  reducer: persistedReducer,
});

// Create persistor
const persistor = persistStore(store);

// Export the store and persistor
export default { store, persistor };
