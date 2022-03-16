import './App.css'
import { Box2, ComponentsProvider } from '@looker/components'
import { CreateContact } from './components/CreactContact.component'
import { CreatePet } from './components/CreatePet.component'
import { CreatePhone } from './components/CreactPhone.component'
import { fakeAPIErrors } from './fake_api_errors'

export const Query = (_payload: any) => {
  return new Promise((resolve, _reject) => {
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
        <Box2 width="2rem" />
        <CreatePhone />
      </Box2>
    </ComponentsProvider>
  )
}

export default App
