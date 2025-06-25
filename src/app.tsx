import { h } from 'preact'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { ReservationModal } from './components/ReservationModal'
import './app.css'

export function App() {
  return (
    <div>
      <Header />
      <Hero />
      <ReservationModal />
      <Contact />
      <Footer />
    </div>
  )
}
