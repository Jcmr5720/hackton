import React from 'react'

export default function Hero() {
  return (
    <section
      className="hero d-flex flex-column justify-content-center align-items-center text-white text-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1950&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '80vh'
      }}
    >
      <div className="container">
        <h1 className="display-1 fw-bold mb-4 mt-5 hero-title animate__animated animate__fadeInDown">
          ¡La mejor hamburguesa de la ciudad!
        </h1>
        <button
          className="btn btn-reserva rounded-pill shadow-lg fs-4 px-5 py-3 mt-4 mb-5 d-inline-flex align-items-center animate__animated animate__rubberBand hvr-pulse-grow"
          data-bs-toggle="modal"
          data-bs-target="#reservationModal"
        >
          <i className="bi bi-calendar-event me-2 fs-3" />
          Haz tu reserva
        </button>
      </div>
    </section>
  )
}
