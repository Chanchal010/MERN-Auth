import { useState } from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import About from './pages/About'
import Profile from './pages/Profile'
import Header from './components/Header'
import PtivateRoute from './components/PtivateRoute'



function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element= {<Home/>}/>
        <Route path='/sign-up' element= {<SignUp/>}/>
        <Route path='/sign-in' element= {<SignIn/>}/>
        <Route path='/about' element= {<About/>}/>
        <Route element={<PtivateRoute/>}>
        <Route path='/profile' element= {<Profile/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
