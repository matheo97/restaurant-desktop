import { Item } from 'models'
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../../constants/page'
import axios from '../base'
import {
  CreateItem,
  FindItemsQuery,
  FindItemsResponse,
  UpdateItem,
} from './item.types'

export class ItemService {
  private url = '/item'

  getItems = async ({
    page = DEFAULT_PAGE,
    pageSize = DEFAULT_PAGE_SIZE,
    query,
    orderBy,
    ...params
  }: FindItemsQuery): Promise<FindItemsResponse> => {
    const { data } = await axios.get<FindItemsResponse>(this.url, {
      params: {
        q: query,
        pageSize,
        page,
        orderBy: orderBy || undefined,
        ...params,
      },
    })
    return data
  }

  getItem = async (id: string): Promise<Item> => {
    const { data } = await axios.get<Item>(`${this.url}/${id}`)
    return data
  }

  create = async (item: CreateItem): Promise<Item> => {
    const { data } = await axios.post<Item>(this.url, item)
    return data
  }

  update = async (item: UpdateItem): Promise<Item> => {
    const { data } = await axios.put<Item>(`${this.url}/${item.id}`, item)
    return data
  }

  delete = async (id: string): Promise<string> => {
    await axios.delete<string>(`${this.url}/${id}`)
    return id
  }
}

export default new ItemService()
