import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <div className="container text-center">
        <p className="mb-1">&copy; {new Date().getFullYear()} Hackton</p>
        <div className="mb-2">
          <a href="#" className="text-white me-3">Facebook</a>
          <a href="#" className="text-white me-3">Instagram</a>
          <a href="#" className="text-white">Twitter</a>
        </div>
        <p className="mb-0">Av. Principal 123, Ciudad</p>
      </div>
    </footer>
  )
}
