import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
  ThunkDispatch,
} from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { createLogger } from 'redux-logger'
import { PERSIST_TIMEOUT, CACHE_VERSION, PERSIST_KEY } from '../constants/store'
import auth from './slices/auth'
import customer from './slices/customer'
import item from './slices/item'

export const isProduction = process.env.NODE_ENV === 'production'

const appReducer = combineReducers({
  auth,
  customer,
  item,
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rootReducer = (state: any, action: any) => {
  if (action.type === 'LOG_OUT') {
    state = undefined
    localStorage.clear()
  }
  return appReducer(state, action)
}

export type RootState = ReturnType<typeof rootReducer>

export const persistConfig = {
  storage,
  key: PERSIST_KEY,
  timeout: PERSIST_TIMEOUT,
  keyPrefix: CACHE_VERSION,
  whitelist: ['auth'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const middlewares: any[] = []

if (!isProduction) {
  const logger = createLogger()
  middlewares.push(logger)
}

export const store = configureStore({
  reducer: persistedReducer,
  devTools: !isProduction,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(middlewares),
})

export const persistor = persistStore(store)
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export type AppDispatch = ThunkDispatch<RootState, unknown, Action<string>>
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAppState = <Selected = unknown>(
  selector: (state: RootState) => Selected,
  equalityFn?: (left: Selected, right: Selected) => boolean
) => useSelector(selector, equalityFn)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAppDispatch = () => useDispatch<AppDispatch>()
