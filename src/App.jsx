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
      <Route path="/add-carousel" element={<AddCarousel />} />
      <Route path="/all-carousel" element={<Viewcarousel />} />
    </Routes>
    </>
  )
}

export default App
