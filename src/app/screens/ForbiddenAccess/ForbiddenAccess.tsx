import React from 'react'
import {
  ForbiddenAccessContainer,
  ForbiddenAccessContent,
  ForbiddenAccessErrorCode,
  ForbiddenAccessMessage,
} from './ForbiddenAccess.styled'

function ForbiddenAccess() {
  return (
    <ForbiddenAccessContainer>
      <ForbiddenAccessContent>
        <ForbiddenAccessErrorCode>403</ForbiddenAccessErrorCode>
        <ForbiddenAccessMessage>Access Denied</ForbiddenAccessMessage>
      </ForbiddenAccessContent>
    </ForbiddenAccessContainer>
  )
}

export default ForbiddenAccess
