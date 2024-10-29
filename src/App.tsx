import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import './index.css'
import Layout from './Layouts/Layout'
import PlaylistHome from './components/PlaylistHome'
import AuthSpotify from './components/AuthSpotify'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<AuthSpotify />} />
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/playlist/:id' element={<PlaylistHome />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
