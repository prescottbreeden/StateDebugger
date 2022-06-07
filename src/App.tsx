import './App.css'
import { Box2, ComponentsProvider } from '@looker/components'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { Ex1 } from './pages/Ex1.page'
import { Ex2 } from './pages/Ex2.page'
import { Ex3 } from './pages/Ex3.page'
import { Home } from './pages/Home.page'

function App() {
  return (
    <ComponentsProvider>
      <Box2 display="flex" flexDirection="column" p="1rem 2rem">
        <BrowserRouter>
          <Box2 display="flex">
            <Box2 m="1rem" p=".5rem">
              <Link to="/ex1">Example 1</Link>
            </Box2>
            <Box2 m="1rem" p=".5rem">
            <Link to="/ex2">Example 2</Link>
            </Box2>
            <Box2 m="1rem" p=".5rem">
            <Link to="/ex3">Example 3</Link>
            </Box2>
          </Box2>
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
