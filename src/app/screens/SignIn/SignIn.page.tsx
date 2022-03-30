import React from 'react'
import { SignInRequestBody } from '../../services/auth-service'
import { authActions } from '../../store/slices/auth'
import { unwrapResult } from '@reduxjs/toolkit'
import { Button, Checkbox, Form, Input, Tabs } from 'antd'
import { useAppDispatch } from '../../store'
import { SignInContainer, TabsWrapper } from './SignIn.styled'

const SignInPage = () => {
  const dispatch = useAppDispatch()
  const [form] = Form.useForm()

  const onFinish = (data: SignInRequestBody) => {
    dispatch(authActions.signIn(data))
      .then(unwrapResult)
      .then(data =>
        dispatch(authActions.getMe(undefined))
          .then(unwrapResult)
          .then(() => {
            window.ipc.invoke('authenticate', {
              token: data.accessToken,
            })
            dispatch(authActions.setIsLogged(true))
          })
          .catch(() => {
            alert(
              `No fue posible encontrar al usuario. Por favor intentelo de nuevo mas tarde`
            )
          })
      )
      .catch(() => {
        alert(`No fue posible ingresar. Por favor intentelo de nuevo mas tarde`)
      })
  }

  const onReset = () => {
    form.resetFields()
  }

  return (
    <SignInContainer>
      <TabsWrapper>
        <Tabs defaultActiveKey="1" centered>
          <Tabs.TabPane tab="Ingresar" key="1">
            <Form
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              form={form}
              name="sign-in"
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                label="Email"
                rules={[
                  { required: true, message: 'Por favor ingrese su email' },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: 'Por favor ingrese su password' },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 4, span: 20 }}
              >
                <Checkbox>Recordarme</Checkbox>
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginRight: '10px' }}
                >
                  Ingresar
                </Button>
                <Button htmlType="button" onClick={onReset}>
                  Limpiar Campos
                </Button>
              </Form.Item>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Registrarse" key="2">
            <p>Contactanos</p>
          </Tabs.TabPane>
        </Tabs>
      </TabsWrapper>
    </SignInContainer>
  )
}

export default SignInPage
