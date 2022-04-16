import React, { useCallback } from 'react'
import { Layout, Menu } from 'antd'
import { PieChartOutlined, UserOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { pages, Pages } from '../../screens/pages'
import { SidebarProps } from './Sidebar.props'
import './style.css'

const { Sider, Content, Footer, Header } = Layout

const Sidebar = ({ children }: SidebarProps) => {
  const history = useHistory()

  const handleClick = useCallback((path: string) => history.push(path), [])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item
            key="1"
            icon={<PieChartOutlined />}
            onClick={() => handleClick(pages[Pages.Home].path)}
          >
            Dashboard
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<UserOutlined />}
            onClick={() => handleClick(pages[Pages.Customer].path)}
          >
            Clientes
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content
          style={{
            marginTop: '16px',
            marginLeft: '16px',
            marginRight: '16px',
          }}
        >
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Techno and Ideas ©2022 by MJFD
        </Footer>
      </Layout>
    </Layout>
  )
}

export default Sidebar
