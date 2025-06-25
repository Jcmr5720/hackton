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
        <a href="#" className="btn btn-danger btn-lg">Haz tu pedido</a>
      </div>
    </section>
  )
}
