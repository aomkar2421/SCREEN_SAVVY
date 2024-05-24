import { useState } from 'react'
import './index.css'
import Header from './Components/Header'
import Cards from './Components/Cards'
import { Route, Routes } from 'react-router-dom'
import AddMovie from './Components/AddMovie'
import Detail from './Components/Detail'
import { createContext } from 'react'
import Login from './Components/Login'
import Signup from './Components/Signup'


const Appstate = createContext();

function App() {
  const [login, setLogin] = useState(false)
  const [userName, setUserName] = useState('')

  return (
    <Appstate.Provider value={{login, setLogin, userName, setUserName}} >
    <div className='relative bg-black'>
      <Header/>
      <Routes>
        <Route path='/' element={<Cards/>} />
        <Route path='/addmovie' element={<AddMovie/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/detail/:id' element={<Detail/>} />
      </Routes>
    </div>
    </Appstate.Provider>
  )
}

export default App
export {Appstate}