import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom'
import Sidebar from './pages/sidebar-page'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Sidebar />}/>
      </Routes>

    </Router>
  
       
    </>
  )
}

export default App
