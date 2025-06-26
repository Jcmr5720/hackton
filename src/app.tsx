import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import LoginModal from './components/LoginModal'
import RegisterModal from './components/RegisterModal'
import ReservationModal from './components/ReservationModal'
import BuyModal from './components/BuyModal'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import Home from './pages/Home'
import About from './pages/About'
import PublicProfile from './pages/PublicProfile'
import './app.css'

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <LoginModal />
      <RegisterModal />
      <ReservationModal />
      <BuyModal />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<PublicProfile />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
