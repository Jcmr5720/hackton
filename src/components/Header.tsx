import { h } from 'preact'
import { Link } from '../router'

export function Header() {
  return (
    <nav class="navbar navbar-expand-lg" style="background:black; box-shadow:0 2px 4px rgba(0,0,0,0.5)">
      <div class="container">
        <Link to="/" class="navbar-brand">
          <img src="https://via.placeholder.com/40?text=AR" alt="logo" width="40" class="me-2" />
          <span style="color:orange; font-weight:bold">Al Rock Burger</span>
        </Link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon" style="filter:invert(100%)"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item"><Link to="/" class="nav-link" style="color:white">Inicio</Link></li>
            <li class="nav-item"><Link to="/menu" class="nav-link" style="color:white">Menú</Link></li>
            <li class="nav-item"><Link to="/reservas" class="nav-link" style="color:white">Reservas</Link></li>
            <li class="nav-item"><Link to="/sobre" class="nav-link" style="color:white">Sobre Nosotros</Link></li>
            <li class="nav-item"><Link to="/contacto" class="nav-link" style="color:white">Contacto</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
