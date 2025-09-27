import './App.css'
import {Signup} from './Pages/Signup'
import { Route, Routes } from 'react-router-dom'
import { Login } from './Pages/Login'

function App() {

  return (
    <>


    <Routes>
      <Route path='/signup' element={<Signup/>}/>
      <Route path="/login" element={<Login/>} />
    </Routes>
    </>
  )
}

export default App
