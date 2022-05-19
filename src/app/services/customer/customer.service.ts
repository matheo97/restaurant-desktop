import { Customer } from 'models'
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../../constants/page'
import axios from '../base'
import {
  CreateCustomer,
  FindCustomersQuery,
  FindCustomersResponse,
  UpdateCustomer,
} from './customer.types'

export class CustomerService {
  private url = '/client'

  getClients = async ({
    page = DEFAULT_PAGE,
    pageSize = DEFAULT_PAGE_SIZE,
    query,
    orderBy,
    ...params
  }: FindCustomersQuery): Promise<FindCustomersResponse> => {
    const { data } = await axios.get<FindCustomersResponse>(this.url, {
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

  getClient = async (id: string): Promise<Customer> => {
    const { data } = await axios.get<Customer>(`${this.url}/${id}`)
    return data
  }

  create = async (customer: CreateCustomer): Promise<Customer> => {
    const { data } = await axios.post<Customer>(this.url, customer)
    return data
  }

  update = async (customer: UpdateCustomer): Promise<Customer> => {
    const { data } = await axios.put<Customer>(
      `${this.url}/${customer.id}`,
      customer
    )
    return data
  }

  delete = async (id: string): Promise<string> => {
    await axios.delete<string>(`${this.url}/${id}`)
    return id
  }
}

export default new CustomerService()
