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
        <div className="d-flex justify-content-center mt-4">
          <button
            className="btn btn-lg px-5 py-3 fw-bold text-white rounded-pill shadow-lg animate__animated animate__pulse animate__infinite d-inline-flex align-items-center"
            style={{
              background: 'linear-gradient(90deg, #ff1a1a 0%, #ff9900 100%)',
              boxShadow: '0 0 32px 4px rgba(255,90,0,0.6)',
              fontSize: '2rem',
              border: 'none',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            data-bs-toggle="modal"
            data-bs-target="#reservationModal"
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.07)'
              e.currentTarget.style.boxShadow = '0 0 48px 8px rgba(255,90,0,0.9)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = '0 0 32px 4px rgba(255,90,0,0.6)'
            }}
          >
            <i className="bi bi-calendar-event-fill me-2" />
            HAZ TU RESERVA
          </button>
        </div>
      </div>
    </section>
  )
}
