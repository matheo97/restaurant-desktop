import { createAsyncThunk } from '@reduxjs/toolkit'
import customerService from '../../../services/customer'

export const getClients = createAsyncThunk(
  'customer/get-clients',
  customerService.getClients
)
export const getClient = createAsyncThunk(
  'customer/get-client',
  customerService.getClient
)
export const create = createAsyncThunk(
  'customer/create',
  customerService.create
)
export const update = createAsyncThunk(
  'customer/update',
  customerService.update
)
export const deleteCustomer = createAsyncThunk(
  'customer/delete',
  customerService.delete
)
