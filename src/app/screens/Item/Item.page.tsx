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
import { Item } from '../../../models'
import usePagination from '../../hooks/use-pagination'
import { useAppDispatch, useAppState } from '../../store'
import { itemsActions } from '../../store/slices/item'
import { APILoadingStatus } from '../../types/api-loading-status'
import { ItemOrderBy } from '../../types/item-order-by'
import ItemModal from './Item.modal'
import { ItemContainer, ItemHeader } from './Item.styled'
import { ItemType } from '../../../types/api/item-type'

const { Search } = Input

const ItemPage = () => {
  const dispatch = useAppDispatch()
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<Item>(undefined)
  const { items, itemsTotal, itemsStatus } = useAppState(state => state.item)
  const { page, pageSize, setPage, setSearch, handleFind } =
    usePagination<ItemOrderBy>(params => {
      dispatch(itemsActions.getItems(params))
    })

  const handleOpenEditModal = useCallback(
    (record: Item) => {
      setSelectedItem(record)
      setModalVisible(true)
    },
    [setSelectedItem, setModalVisible]
  )

  const handleCancel = useCallback(() => {
    setModalVisible(false)
    setSelectedItem(undefined)
  }, [setModalVisible, setSelectedItem])

  const itemTableColumns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Costo',
      dataIndex: 'cost',
      key: 'cost',
    },
    {
      title: 'Descripcion',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Tipo de Producto',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_text: string, record: Item) => (
        <Space size="middle">
          <EditOutlined onClick={() => handleOpenEditModal(record)} />
          <Popconfirm
            title="Esta seguro que desea borrar este producto?"
            okText="Si"
            cancelText="No"
            onConfirm={() =>
              dispatch(itemsActions.deleteItem(record.id))
                .then(unwrapResult)
                .then(() => {
                  message.success('Producto borrado con exito')
                  handleFind()
                })
                .catch(err => {
                  message.error('Hubo un problema. Producto no borrado')
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
    <ItemContainer>
      <ItemHeader>
        <Search
          placeholder="Informacion del Producto"
          allowClear
          enterButton="Buscar"
          size="large"
          onSearch={(value: string) => setSearch(value)}
          loading={itemsStatus === APILoadingStatus.Loading}
        />
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          size="large"
          onClick={() => setModalVisible(true)}
        >
          Crear Producto
        </Button>
      </ItemHeader>
      <Table
        loading={itemsStatus === APILoadingStatus.Loading}
        dataSource={items}
        columns={itemTableColumns}
        pagination={false}
      />
      <Pagination
        onChange={setPage}
        total={itemsTotal}
        current={page}
        pageSize={pageSize}
        style={{
          position: 'absolute',
          bottom: '5px',
          left: '5px',
        }}
      />
      <ItemModal
        visible={modalVisible}
        handleCancel={handleCancel}
        item={selectedItem}
        handleFind={handleFind}
        itemTypes={[ItemType.ITEM, ItemType.DRINK, ItemType.FOOD]}
      />
    </ItemContainer>
  )
}

export default ItemPage
