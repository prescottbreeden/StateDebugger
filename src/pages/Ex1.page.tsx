import React from 'react'
import { Box2 } from '@looker/components'
import { CreateContact } from '../components/CreactContact.component'

export const Ex1: React.FC = () => {
  return (
    <>
      <Box2 ml="4rem" p="1rem 2rem" style={{ border: '1px solid black' }}>
        <CreateContact />
      </Box2>
    </>
  )
}
