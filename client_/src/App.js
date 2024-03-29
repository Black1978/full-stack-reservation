import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Hotel from './pages/hotel/Hotel'
import List from './pages/list/List'
import React from 'react'
import Login from './pages/login/Login'

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/hotels' element={<List />} />
                    <Route path='/hotels/find/:id' element={<Hotel />} />
                    <Route path='/login' element={<Login />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
