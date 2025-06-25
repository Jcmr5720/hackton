import { h } from 'preact'

export function Hero() {
  return (
    <section class="hero d-flex align-items-center text-white text-center" style="background-image:url('https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1950&q=80'); background-size:cover; background-position:center; height:80vh;">
      <div class="container">
        <h1 class="display-4 fw-bold mb-4">¡La mejor hamburguesa de la ciudad!</h1>
        <a
          href="#"
          class="btn btn-danger btn-lg reservation-btn rounded-pill px-4"
          data-bs-toggle="modal"
          data-bs-target="#reservationModal"
        >
          Haz tu reserva
        </a>
      </div>
    </section>
  )
}
