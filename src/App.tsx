import { Box2, ComponentsProvider } from '@looker/components'
import React from 'react'
import './App.css'
import { CreateContact } from './components/CreactContact.component'
import { CreatePet } from './components/CreatePet.component'
import { fakeAPIErrors } from './fake_api_errors'

export const Query = (payload: any) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        ...fakeAPIErrors,
      })
    }, 1000)
  })
}

function App() {
  return (
    <ComponentsProvider>
      <Box2 display="flex" p="1rem 2rem">
        <CreateContact />
        <Box2 width="2rem" />
        <CreatePet />
      </Box2>
    </ComponentsProvider>
  )
}

export default App
