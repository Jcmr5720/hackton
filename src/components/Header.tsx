import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark premium-header sticky-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src="/img/logo.png" alt="Al Rock Burger Logo" className="me-2 logo-img" />
          <span>Al Rock Burger</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-2 mt-3 mt-lg-0">
            <li className="nav-item">
              <button className="btn btn-outline-light rounded-pill px-3" data-bs-toggle="modal" data-bs-target="#loginModal">Inicio de sesión</button>
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-light rounded-pill px-3" data-bs-toggle="modal" data-bs-target="#registerModal">Crea tu cuenta</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
