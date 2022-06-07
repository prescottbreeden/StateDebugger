import React from 'react'
import { Box2 } from '@looker/components'

interface HomeProps {}
export const Home: React.FC<HomeProps> = (props) => {
  return (
    <>
      <Box2>
        <h1>Super Tooling Development Tooling</h1>
        <p>Lack of interactive data-oriented debugging tools</p>
      </Box2>
    </>
  )
}
