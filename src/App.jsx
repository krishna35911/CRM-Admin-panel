import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Pages/Login'
import AddCarousel from './Pages/AddCarousel'
import Viewcarousel from './Pages/Viewcarousel'
import EditCarousal from './Pages/EditCarousal'
import AllCrms from './Pages/CRMs/AllCrms'
import Addcrms from './Pages/CRMs/Addcrms'
import Updatecrms from './Pages/CRMs/Updatecrms'
import AddCalender from './Pages/Calender/AddCalender'
import AllCalender from './Pages/Calender/AllCalender'
import AllLeaves from './Pages/Leaves/AllLeaves'
import AddExcel from './Pages/ExcelData/AddExcel'
import ViewExcelData from './Pages/ExcelData/ViewExcelData'

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/add-carousel" element={<AddCarousel />} />
      <Route path="/all-carousel" element={<Viewcarousel />} />
      <Route path="/edit-carousel/:id" element={<EditCarousal />} />
      <Route path="/view-all-crms" element={<AllCrms />} />
      <Route path="/add-crm" element={<Addcrms />} />
      <Route path="/update-crm/:id" element={<Updatecrms />}/>
      <Route path="/add-calender" element={<AddCalender />} />
      <Route path="/all-calender" element={<AllCalender />} />
      <Route path='/all-leaves' element={<AllLeaves/>}/>
      <Route path='/excel-data' element={<AddExcel/>}/>
      <Route path='/all-excel-data' element={<ViewExcelData/>}/>
    </Routes>
    </>
  )
}

export default App
