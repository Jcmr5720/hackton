import React from 'react'

export default function Hero() {
  return (
    <section
      className="hero d-flex align-items-center text-white text-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1950&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '80vh'
      }}
    >
      <div className="container">
        <h1 className="display-4 fw-bold mb-4">¡La mejor hamburguesa de la ciudad!</h1>
        <button
          className="btn btn-reserva btn-lg rounded-pill px-4 fw-bold"
          data-bs-toggle="modal"
          data-bs-target="#reservationModal"
        >
          Haz tu reserva
        </button>
      </div>
    </section>
  )
}
