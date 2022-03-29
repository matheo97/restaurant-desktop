import { unwrapResult } from '@reduxjs/toolkit'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppState } from '../../store'
import { authActions } from '../../store/slices/auth'

function useAppInit() {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState<boolean>(true)
  const { auth } = useAppState(state => state.auth)

  useEffect(() => {
    if (auth && auth.accessToken) {
      window.ipc.invoke('authenticate', {
        token: auth.accessToken,
      })
    }
  }, [auth])

  useEffect(() => {
    if (auth && auth.accessToken) {
      const accessToken = `Bearer ${auth.accessToken}`
      window.ipc.invoke('authenticate', {
        token: accessToken,
      })
      dispatch(authActions.getMe(accessToken))
        .then(unwrapResult)
        .then(() => {
          dispatch(
            authActions.setAuth({
              accessToken: auth.accessToken,
              tokenType: 'Bearer',
            })
          )
          dispatch(authActions.setIsLogged(true))
          setLoading(false)
        })
    } else {
      setLoading(false)
      dispatch({ type: 'LOG_OUT' })
    }
  }, [dispatch])

  return { loading }
}

export default useAppInit
