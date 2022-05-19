import { unwrapResult } from '@reduxjs/toolkit'
import { Button, Form, Input, Modal, notification } from 'antd'
import React, { useCallback, useEffect } from 'react'
import { Customer } from '../../../models'
import { useAppDispatch } from '../../store'
import { customersActions } from '../../store/slices/customer'
interface Props {
  visible: boolean
  handleCancel: () => void
  handleFind: () => void
  customer?: Customer
}

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

const CustomerModal = ({
  visible,
  customer,
  handleCancel,
  handleFind,
}: Props) => {
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()

  const handleCreate = useCallback(
    (formFields: any) => {
      if (customer) {
        dispatch(customersActions.update({ ...formFields, id: customer.id }))
          .then(unwrapResult)
          .then(() =>
            notification['success']({
              message: 'Exito!',
              description: 'Cliente actualizado correctamente',
            })
          )
          .catch(e => {
            notification['error']({
              message: 'Ha ocurrido un error',
              description: 'No se ha actualizado el usuario',
            })
          })
      } else {
        dispatch(customersActions.create(formFields))
          .then(unwrapResult)
          .then(() => {
            notification['success']({
              message: 'Exito!',
              description: 'Cliente creado correctamente',
            })
          })
          .catch(e => {
            notification['error']({
              message: 'Ha ocurrido un error',
              description: 'No se ha creado el Cliente',
            })
          })
      }
      form.setFieldsValue({
        name: undefined,
        lastName: undefined,
        phone: undefined,
        email: undefined,
        address: undefined,
      })
      handleCancel()
      handleFind()
    },
    [handleCancel, handleFind, customer]
  )

  useEffect(() => {
    form.setFieldsValue(
      customer || {
        name: undefined,
        lastName: undefined,
        phone: undefined,
        email: undefined,
        address: undefined,
      }
    )
  }, [customer])

  return (
    <Modal
      {...formItemLayout}
      title={`${customer ? 'Actualizar' : 'Crear'} Cliente`}
      visible={visible}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancelar
        </Button>,
        <Button key="submit" type="primary" onClick={form.submit}>
          {customer ? 'Actualizar' : 'Crear'}
        </Button>,
      ]}
    >
      <Form
        form={form}
        name="customer"
        onFinish={handleCreate}
        initialValues={customer}
        scrollToFirstError
      >
        <Form.Item
          name="name"
          label="Nombre"
          rules={[
            {
              required: true,
              message: 'Por favor ingrese el Nombre',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="lastName" label="Apellido">
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Telefono"
          rules={[
            {
              required: true,
              message: 'Por favor ingrese el numero de telefono',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="address"
          label="Direccion"
          rules={[
            {
              required: true,
              message: 'Por favor ingrese el numero de telefono',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              required: true,
              message: 'Por favor ingrese el email',
            },
            {
              type: 'email',
              message: 'El email es invalido',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CustomerModal
