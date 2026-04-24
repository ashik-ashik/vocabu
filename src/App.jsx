
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
import Home from './Pages/Home'
import UpdateUserRole from './Pages/UpdateUserRole'
import useAuth from './hooks/useAuth'
import { DotLoader } from './Pages/DoLoader'

function App() {
  const {userIsLoading} = useAuth();
  if(userIsLoading){
    return <>
      <DotLoader />
    </>
  }

  return (
    <>
      <BrowserRouter>
          <Toaster position="bottom-right" />
          <HeaderMenu />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/advance-words" element={<PrivateRoute><Vocabulary /></PrivateRoute>} />
          <Route path="/basic-words" element={<PrivateRoute><BasicWords /></PrivateRoute>} />
          <Route path="/tense" element={<PrivateRoute><TenseComponent /></PrivateRoute>} />
          <Route path="/phrases" element={<PrivateRoute><IdiomsPhrases /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          {/* Dashboard Layout */}
        <Route path="/dashboard" element={<PrivateRoute role="admin">
            <DashboardLayout />
          </PrivateRoute>}>
          
          {/* default page */}
          <Route index element={<Overview />} />

          {/* other pages */}
          <Route path="add-word" element={<AddWord />} />
          <Route path="add-phrase" element={<AddPhrase />} />
          <Route path="delete-word" element={<DeleteWord />} />
          <Route path="edit-word" element={<EditWord />} />
          <Route path="role" element={<UpdateUserRole />} />
          <Route path="settings" element={<Settings />} />
          <Route path="info" element={<Info />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
