
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Vocabulary from './Pages/VocabularyPage'
import HeaderMenu from './Pages/HeaderMenu'
import DashboardLayout from './Pages/Dashboard'
import Overview from './Pages/Overview'
import AddWord from './Pages/AddWords'
import { Toaster } from 'react-hot-toast'
import DeleteWord from './Pages/DeleteWord'
import EditWord from './Pages/EditWords'
import Settings from './Pages/Settings'
import Info from './Pages/Info'
import TenseComponent from './Pages/Tense'
import BasicWords from './Pages/BasicWords'
import IdiomsPhrases from './Pages/IdiomsPhrases'
import AddPhrase from './Pages/AddPhrase'
import Login from './Pages/Login'
import PrivateRoute from './Pages/PrivateRoute'

function App() {

  return (
    <>
      <BrowserRouter>
          <Toaster position="bottom-right" />
          <HeaderMenu />
        <Routes>
          <Route path="/" element={<Vocabulary />} />
          <Route path="/tense" element={<TenseComponent />} />
          <Route path="/basic-words" element={<BasicWords />} />
          <Route path="/phrases" element={<IdiomsPhrases />} />
          <Route path="/login" element={<Login />} />
          {/* Dashboard Layout */}
        <Route path="/dashboard" element={<PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>}>
          
          {/* default page */}
          <Route index element={<Overview />} />

          {/* other pages */}
          <Route path="add-word" element={<AddWord />} />
          <Route path="add-phrase" element={<AddPhrase />} />
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
