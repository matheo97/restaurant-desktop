import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  authService,
  MeResponseBody,
  SignInRequestBody,
  SignInResponseBody,
} from '../../../services/auth-service'

export const signIn = createAsyncThunk<SignInResponseBody, SignInRequestBody>(
  'auth/sign-in',
  authService.signIn
)

export const getMe = createAsyncThunk<MeResponseBody, string | undefined>(
  'auth/me',
  authService.me
)
