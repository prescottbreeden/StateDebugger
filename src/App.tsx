import { ComponentsProvider } from '@looker/components'
import React from 'react'
import './App.css'
import { CreateContact } from './components/CreactContact.component'

function App() {
  return (
    <ComponentsProvider>
      <div className="App">
        <CreateContact />
      </div>
    </ComponentsProvider>
  )
}

export default App
