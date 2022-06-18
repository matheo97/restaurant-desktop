import { createAsyncThunk } from '@reduxjs/toolkit'
import itemService from '../../../services/item'

export const getItems = createAsyncThunk('item/get-items', itemService.getItems)
export const getItem = createAsyncThunk('item/get-item', itemService.getItem)
export const create = createAsyncThunk('item/create', itemService.create)
export const update = createAsyncThunk('item/update', itemService.update)
export const deleteItem = createAsyncThunk('item/delete', itemService.delete)
