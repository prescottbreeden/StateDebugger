import './App.css'
import { Box2, ComponentsProvider } from '@looker/components'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Ex1 } from './pages/Ex1.page'
import { Ex2 } from './pages/Ex2.page'
import { Ex3 } from './pages/Ex3.page'
import { Home } from './pages/Home.page'

function App() {
  return (
    <ComponentsProvider>
      <Box2 display="flex" p="1rem 2rem">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ex1" element={<Ex1 />} />
            <Route path="/ex2" element={<Ex2 />} />
            <Route path="/ex3" element={<Ex3 />} />
          </Routes>
        </BrowserRouter>
      </Box2>
    </ComponentsProvider>
  )
}

export default App
