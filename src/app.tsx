import { h } from 'preact'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { BrowserRouter } from './router'
import { Home } from './pages/Home'
import { MenuPage } from './pages/MenuPage'
import { ReservasPage } from './pages/ReservasPage'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import './app.css'

export function App() {
  const routes = [
    { path: '/', component: Home },
    { path: '/menu', component: MenuPage },
    { path: '/reservas', component: ReservasPage },
    { path: '/sobre', component: AboutPage },
    { path: '/contacto', component: ContactPage }
  ]

  return (
    <div>
      <Header />
      <BrowserRouter routes={routes} />
      <Footer />
    </div>
  )
}
