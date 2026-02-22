import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { cartSlice } from './cart/cart.slice';

const persistConfig = {
  key: 'online-shops',
  storage,
  whitelist: ['cart'],
};

const isClient = typeof window !== 'undefined';

const combinedReducers = combineReducers({
  cart: cartSlice.reducer,
});

let mainReducer = combinedReducers;

if (isClient) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { persistReducer } = require('redux-persist');

  mainReducer = persistReducer(persistConfig, combinedReducers);
}

export const store = configureStore({
  reducer: mainReducer,
  middleware: (getDefaultMiddlewere) =>
    getDefaultMiddlewere({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type TypeRootStore = ReturnType<typeof mainReducer>;
