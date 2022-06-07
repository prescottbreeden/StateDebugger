import React from 'react'
import { Box2 } from '@looker/components'
import {CreateContact} from '../components/CreactContact.component'

interface Ex2Props {}
export const Ex2: React.FC<Ex2Props> = (props) => {
  return (
    <>
      <Box2 ml="4rem" p="1rem 2rem" style={{ border: '1px solid black' }}>
        <CreateContact withBff />
      </Box2>
    </>
  )
}
