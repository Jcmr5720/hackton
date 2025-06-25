import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import LoginModal from './components/LoginModal'
import RegisterModal from './components/RegisterModal'
import ReservationModal from './components/ReservationModal'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import './app.css'

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <LoginModal />
      <RegisterModal />
      <ReservationModal />
      <main className="flex-fill pt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
