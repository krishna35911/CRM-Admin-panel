import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Pages/Login'
import AddCarousel from './Pages/AddCarousel'
import Viewcarousel from './Pages/Viewcarousel'

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/addcarousel" element={<AddCarousel />} />
      <Route path="/allcarousel" element={<Viewcarousel />} />
    </Routes>
    </>
  )
}

export default App
