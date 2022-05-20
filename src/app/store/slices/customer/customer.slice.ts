import { createSlice } from '@reduxjs/toolkit'
import { Customer } from 'models'
import { APILoadingStatus } from '../../../types/api-loading-status'
import asyncReducers from '../../../utils/async-reducers'
import {
  getClients,
  getClient,
  create,
  update,
  deleteCustomer,
} from './customer.actions'

export type CustomerState = {
  customers: Customer[]
  customersTotal: number
  customersStatus: APILoadingStatus
  customersError: Record<string, unknown> | null
  createStatus: APILoadingStatus
  updateStatus: APILoadingStatus
  deleteStatus: APILoadingStatus
}

const initialState: CustomerState = {
  customers: [],
  customersTotal: 0,
  customersStatus: APILoadingStatus.Idle,
  customersError: null,
  createStatus: APILoadingStatus.Idle,
  deleteStatus: APILoadingStatus.Idle,
  updateStatus: APILoadingStatus.Idle,
}

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {},
  extraReducers: builder => {
    asyncReducers(builder, getClients, 'customersStatus', (state, action) => {
      state.customersTotal = action.payload.total
      state.customers = action.payload.results
    })
    asyncReducers(builder, getClient, 'customersStatus')
    asyncReducers(builder, create, 'createStatus')
    asyncReducers(builder, update, 'updateStatus')
    asyncReducers(builder, deleteCustomer, 'deleteStatus')
  },
})

export default customerSlice.reducer
export const customersActions = {
  ...customerSlice.actions,
  getClients,
  getClient,
  create,
  update,
  deleteCustomer,
}
