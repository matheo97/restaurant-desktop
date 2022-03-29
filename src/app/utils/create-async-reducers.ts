import {
  ActionReducerMapBuilder,
  AsyncThunk,
  Draft,
  PayloadAction,
  SerializedError,
} from '@reduxjs/toolkit'
import { APILoadingStatus } from 'types/api/api-loading-status'

function createAsyncReducers<State, Returned, Args = void>(
  builder: ActionReducerMapBuilder<State>,
  action: AsyncThunk<Returned, Args, Record<string, unknown>>,
  statusKey: keyof Draft<State>,
  fulfilled?: (state: Draft<State>, action: PayloadAction<Returned>) => void,
  rejected?: (
    state: Draft<State>,
    action: PayloadAction<
      unknown,
      string,
      {
        arg: Args
        requestId: string
        rejectedWithValue: boolean
        requestStatus: 'rejected'
        aborted: boolean
        condition: boolean
      },
      SerializedError
    >
  ) => void
  // pending?: (state: Draft<State>, action: PayloadAction<Returned>) => void,
): void {
  builder.addCase(action.pending, state => {
    state[statusKey] =
      APILoadingStatus.Loading as Draft<State>[keyof Draft<State>]
    // if (pending) pending(state, action)
  })
  builder.addCase(action.fulfilled, (state, action) => {
    state[statusKey] =
      APILoadingStatus.Succeeded as Draft<State>[keyof Draft<State>]
    if (fulfilled) fulfilled(state, action)
  })
  builder.addCase(action.rejected, (state, action) => {
    state[statusKey] =
      APILoadingStatus.Failed as Draft<State>[keyof Draft<State>]
    if (rejected) rejected(state, action)
  })
}

export default createAsyncReducers
