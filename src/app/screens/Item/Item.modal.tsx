import { unwrapResult } from '@reduxjs/toolkit'
import { Button, Form, Input, Modal, notification, Select } from 'antd'
import React, { useCallback, useEffect } from 'react'
import { useAppDispatch } from '../../store'
import { itemsActions } from '../../store/slices/item'
import { Item } from '../../../models'

interface Props {
  visible: boolean
  handleCancel: () => void
  handleFind: () => void
  item?: Item
  itemTypes: string[]
}

const { Option } = Select

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}

const ItemModal = ({
  visible,
  item,
  handleCancel,
  handleFind,
  itemTypes,
}: Props) => {
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()

  const handleCreate = useCallback(
    (formFields: any) => {
      if (item) {
        dispatch(itemsActions.update({ ...formFields, id: item.id }))
          .then(unwrapResult)
          .then(() =>
            notification['success']({
              message: 'Exito!',
              description: 'Producto actualizado correctamente',
            })
          )
          .catch(e => {
            notification['error']({
              message: 'Ha ocurrido un error',
              description: 'No se ha actualizado el producto',
            })
          })
      } else {
        dispatch(itemsActions.create(formFields))
          .then(unwrapResult)
          .then(() => {
            notification['success']({
              message: 'Exito!',
              description: 'Producto creado correctamente',
            })
          })
          .catch(e => {
            notification['error']({
              message: 'Ha ocurrido un error',
              description: 'No se ha creado el Producto',
            })
          })
      }
      form.setFieldsValue({
        name: undefined,
        cost: undefined,
        description: undefined,
        type: undefined,
      })
      handleCancel()
      handleFind()
    },
    [handleCancel, handleFind, item]
  )

  useEffect(() => {
    form.setFieldsValue(
      item || {
        name: undefined,
        cost: undefined,
        description: undefined,
        type: undefined,
      }
    )
  }, [item])

  return (
    <Modal
      {...formItemLayout}
      title={`${item ? 'Actualizar' : 'Crear'} Producto`}
      visible={visible}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancelar
        </Button>,
        <Button key="submit" type="primary" onClick={form.submit}>
          {item ? 'Actualizar' : 'Crear'}
        </Button>,
      ]}
    >
      <Form
        form={form}
        name="item"
        onFinish={handleCreate}
        initialValues={item}
        scrollToFirstError
      >
        <Form.Item
          name="name"
          label="Nombre"
          rules={[
            {
              required: true,
              message: 'Por favor ingrese el nombre del Producto',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="cost"
          label="Costo"
          rules={[
            {
              required: true,
              message: 'Por favor ingrese el costo del producto',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="type"
          label="Tipo de Producto"
          rules={[
            {
              required: true,
              message: 'Por favor ingrese el tipo del producto',
            },
          ]}
        >
          <Select placeholder="Seleccione el tipo del producto">
            {itemTypes.map(value => {
              return <Option key={value}> {value} </Option>
            })}
          </Select>
        </Form.Item>
        <Form.Item
          name="description"
          label="Descripcion"
          rules={[
            {
              required: false,
              message: 'Por favor ingrese una descripcion del producto',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ItemModal
