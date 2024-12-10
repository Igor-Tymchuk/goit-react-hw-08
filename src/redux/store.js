import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./contacts/slice";
import filtersReducer from "./filters/slice";
import authReducer from "./auth/slice";
import commonReducer from "./common/slice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "auth",
  version: 1,
  storage,
  whitelist: ["token"],
};
const persistTheme = {
  key: "common",
  version: 1,
  storage,
  whitelist: ["darkTheme"],
};

const persistedReducerToken = persistReducer(persistConfig, authReducer);
const persistedReducerTheme = persistReducer(persistTheme, commonReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducerToken,
    contacts: contactsReducer,
    filters: filtersReducer,
    common: persistedReducerTheme,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export let persistor = persistStore(store);
export default store;
