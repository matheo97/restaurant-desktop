import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons'
import { unwrapResult } from '@reduxjs/toolkit'
import {
  Button,
  Input,
  message,
  Pagination,
  Popconfirm,
  Space,
  Table,
} from 'antd'
import React, { useCallback, useState } from 'react'
import { Customer } from '../../../models'
import usePagination from '../../hooks/use-pagination'
import { useAppDispatch, useAppState } from '../../store'
import { customersActions } from '../../store/slices/customer'
import { APILoadingStatus } from '../../types/api-loading-status'
import { CustomerOrderBy } from '../../types/customer-order-by'
import CustomerModal from './Customer.modal'
import { CustomerContainer, CustomerHeader } from './Customer.styled'

const { Search } = Input

const CustomerPage = () => {
  const dispatch = useAppDispatch()
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>(undefined)
  const { customers, customersTotal, customersStatus } = useAppState(
    state => state.customer
  )
  const { page, pageSize, setPage, setSearch, handleFind } =
    usePagination<CustomerOrderBy>(params => {
      dispatch(customersActions.getClients(params))
    })

  const handleOpenEditModal = useCallback(
    (record: Customer) => {
      setSelectedCustomer(record)
      setModalVisible(true)
    },
    [setSelectedCustomer, setModalVisible]
  )

  const handleCancel = useCallback(() => {
    setModalVisible(false)
    setSelectedCustomer(undefined)
  }, [setModalVisible, setSelectedCustomer])

  const customerTableColumns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Apellido',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Telefono',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Direccion',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_text: string, record: Customer) => (
        <Space size="middle">
          <EditOutlined onClick={() => handleOpenEditModal(record)} />
          <Popconfirm
            title="Esta seguro que desea borrar este cliente?"
            okText="Si"
            cancelText="No"
            onConfirm={() =>
              dispatch(customersActions.deleteCustomer(record.id))
                .then(unwrapResult)
                .then(() => {
                  message.success('Usuario borrado con exito')
                  handleFind()
                })
                .catch(err => {
                  message.error('Hubo un problema. Usuario no borrado')
                  console.error(err)
                })
            }
          >
            <DeleteOutlined />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <CustomerContainer>
      <CustomerHeader>
        <Search
          placeholder="Informacion de Cliente"
          allowClear
          enterButton="Buscar"
          size="large"
          onSearch={(value: string) => setSearch(value)}
          loading={customersStatus === APILoadingStatus.Loading}
        />
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          size="large"
          onClick={() => setModalVisible(true)}
        >
          Crear Cliente
        </Button>
      </CustomerHeader>
      <Table
        loading={customersStatus === APILoadingStatus.Loading}
        dataSource={customers}
        columns={customerTableColumns}
        pagination={false}
      />
      <Pagination
        onChange={setPage}
        total={customersTotal}
        current={page}
        pageSize={pageSize}
        style={{
          position: 'absolute',
          bottom: '5px',
          left: '5px',
        }}
      />
      <CustomerModal
        visible={modalVisible}
        handleCancel={handleCancel}
        customer={selectedCustomer}
        handleFind={handleFind}
      />
    </CustomerContainer>
  )
}

export default CustomerPage
