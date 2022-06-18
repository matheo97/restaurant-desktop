import { createSlice } from '@reduxjs/toolkit'
import { Item } from 'models'
import { APILoadingStatus } from '../../../types/api-loading-status'
import asyncReducers from '../../../utils/async-reducers'
import { getItems, getItem, create, update, deleteItem } from './item.actions'

export type ItemState = {
  items: Item[]
  itemsTotal: number
  itemsStatus: APILoadingStatus
  itemsError: Record<string, unknown> | null
  createStatus: APILoadingStatus
  updateStatus: APILoadingStatus
  deleteStatus: APILoadingStatus
}

const initialState: ItemState = {
  items: [],
  itemsTotal: 0,
  itemsStatus: APILoadingStatus.Idle,
  itemsError: null,
  createStatus: APILoadingStatus.Idle,
  deleteStatus: APILoadingStatus.Idle,
  updateStatus: APILoadingStatus.Idle,
}

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {},
  extraReducers: builder => {
    asyncReducers(builder, getItems, 'itemsStatus', (state, action) => {
      state.itemsTotal = action.payload.total
      state.items = action.payload.results
    })
    asyncReducers(builder, getItem, 'itemsStatus')
    asyncReducers(builder, create, 'createStatus')
    asyncReducers(builder, update, 'updateStatus')
    asyncReducers(builder, deleteItem, 'deleteStatus')
  },
})

export default itemSlice.reducer
export const itemsActions = {
  ...itemSlice.actions,
  getItems: getItems,
  getItem: getItem,
  create,
  update,
  deleteItem: deleteItem,
}
