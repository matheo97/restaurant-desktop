import React from 'react'
import { Spin } from 'antd'
import { PageLoaderContainer } from './PageLoader.styled'

const PageLoader = () => (
  <PageLoaderContainer>
    <Spin size="large" tip="Cargando..." />
  </PageLoaderContainer>
)

export default PageLoader
