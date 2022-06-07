import React from 'react'
import { Box2 } from '@looker/components'
import { CreateContact } from '../components/CreactContact.component'
import { CreatePhone } from '../components/CreactPhone.component'
import { CreatePet } from '../components/CreatePet.component'

export const Ex1: React.FC = () => {
  return (
    <>
      <Box2 display="flex">
        <Box2 p="1rem 2rem" style={{ border: '1px solid black' }}>
          <CreateContact />
        </Box2>
        <Box2 p="1rem 2rem" style={{ border: '1px solid black' }}>
          <CreatePhone />
        </Box2>
        <Box2 p="1rem 2rem" style={{ border: '1px solid black' }}>
          <CreatePet />
        </Box2>
      </Box2>
    </>
  )
}
