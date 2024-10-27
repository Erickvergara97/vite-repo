import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import './index.css'
import Layout from './Layouts/Layout'
import PlaylistHome from './components/PlaylistHome'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/playlist/:id' element={<PlaylistHome />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
