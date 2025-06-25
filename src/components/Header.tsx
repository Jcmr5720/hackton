import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src="/img/logo.png" alt="Logo" height="30" className="me-2" />
          Hackton
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <button className="nav-link btn btn-link" data-bs-toggle="modal" data-bs-target="#loginModal">Inicio de sesión</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link" data-bs-toggle="modal" data-bs-target="#registerModal">Crea tu cuenta</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
