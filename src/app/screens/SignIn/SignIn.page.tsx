import React, { KeyboardEvent, useState } from 'react'
import { SignInForm, SignInFormButtonContainer } from './SignIn.styled'
import { useForm } from 'react-hook-form'
import { SignInRequestBody } from '../../services/auth-service'
import { authActions } from '../../store/slices/auth'
import { useAppDispatch, useAppState } from '../../store'
import { APILoadingStatus } from '../../../types/api/api-loading-status'
import { unwrapResult } from '@reduxjs/toolkit'

type Form = {
  username: string
  password: string
}

function SignInPage() {
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>()
  const { authStatus } = useAppState(state => state.auth)
  const [hide, setHide] = useState<boolean>(true)
  const onSubmit = handleSubmit((data: SignInRequestBody) => {
    dispatch(authActions.signIn(data))
      .then(unwrapResult)
      .then(data =>
        dispatch(authActions.getMe(undefined))
          .then(unwrapResult)
          .then(() => {
            window.ipc.invoke('authenticate', {
              token: data.accessToken,
            })
            dispatch(authActions.setIsLogged(true))
          })
          .catch(() => {
            alert(`Couldn't get user info. Pls try again`)
          })
      )
      .catch(() => {
        alert(`Couldn't sign in. Pls try again`)
      })
  })

  const toggleHide = () => setHide(!hide)

  return (
    <div>
      <SignInForm>
        <p>Sign in</p>
        <p>Sign in to continue to our application.</p>
        <input
          placeholder={'Phone or Email'}
          defaultValue=""
          name="username"
          {...register('username')}
        />
        <input
          placeholder={'Password'}
          defaultValue=""
          name="password"
          type={hide ? 'password' : 'text'}
          {...register('password')}
          onKeyUp={(evt: KeyboardEvent<HTMLInputElement>) =>
            evt.key === 'Enter' && onSubmit()
          }
        />
        <SignInFormButtonContainer>
          <button onClick={onSubmit}>LOGIN</button>
        </SignInFormButtonContainer>
        <p>Version: 1.0.0</p>
      </SignInForm>
    </div>
  )
}

export default SignInPage
