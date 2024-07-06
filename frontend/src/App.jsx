import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/home' exact element = { <Home/> }></Route>
          <Route path='/' exact element = { <Login/> }></Route>
          <Route path='/login' exact element = { <Login/> }></Route>
          <Route path='/signup' exact element = { <Signup/> }></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
