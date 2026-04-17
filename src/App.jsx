
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/HomePage'
import HeaderMenu from './Pages/HeaderMenu'
import DashboardLayout from './Pages/Dashboard'
import Overview from './Pages/Overview'
import AddWord from './Pages/AddWords'
import { Toaster } from 'react-hot-toast'
import DeleteWord from './Pages/DeleteWord'
import EditWord from './Pages/EditWords'
import Settings from './Pages/Settings'
import Info from './Pages/Info'

function App() {

  return (
    <>
      <BrowserRouter>
      <HeaderMenu />
      <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Dashboard Layout */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          
          {/* default page */}
          <Route index element={<Overview />} />

          {/* other pages */}
          <Route path="add-word" element={<AddWord />} />
          <Route path="delete-word" element={<DeleteWord />} />
          <Route path="edit-word" element={<EditWord />} />
          <Route path="settings" element={<Settings />} />
          <Route path="info" element={<Info />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
