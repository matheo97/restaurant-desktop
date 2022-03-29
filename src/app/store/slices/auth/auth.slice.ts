import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from '../../../services/base'
import { REHYDRATE } from 'redux-persist'
import { Auth } from '../../../services/common/auth.type'
import { APILoadingStatus } from '../../../../types/api/api-loading-status'
import asyncReducers from '../../../utils/async-reducers'
import { signIn, getMe } from './auth.actions'
import { User } from '../../../../models'

export type AuthState = {
  auth: Auth | null
  authStatus: APILoadingStatus
  authError: Record<string, unknown> | null
  user: User | null
  userStatus: APILoadingStatus
  isLogged: boolean
}

const initialState: AuthState = {
  auth: null,
  authStatus: APILoadingStatus.Idle,
  authError: null,
  user: null,
  userStatus: APILoadingStatus.Idle,
  isLogged: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<Auth>) => {
      state.auth = action.payload
    },
    setIsLogged: (state, action: PayloadAction<boolean>) => {
      state.isLogged = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(REHYDRATE, (_, action) => {
      const data = action as PayloadAction<{ auth: AuthState }>
      const auth =
        data && data.payload && data.payload.auth && data.payload.auth.auth
      if (auth)
        axios.defaults.headers.common[
          'Authorization'
        ] = `${auth.tokenType} ${auth.accessToken}`
    })
    asyncReducers(builder, signIn, 'authStatus', (state, action) => {
      const auth = action.payload
      console.table(auth)
      axios.defaults.headers.common[
        'Authorization'
      ] = `${auth.tokenType} ${auth.accessToken}`
      state.auth = auth
      localStorage.setItem('auth', JSON.stringify(auth))
    })
    asyncReducers(
      builder,
      getMe,
      'userStatus',
      (state, action) => {
        state.user = action.payload
      },
      state => {
        state.isLogged = false
        axios.defaults.headers.common['Authorization'] = ''
      }
    )
  },
})

export default authSlice.reducer
export const authActions = {
  ...authSlice.actions,
  signIn,
  getMe,
}
