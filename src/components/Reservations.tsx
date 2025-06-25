import { type FunctionalComponent } from 'preact'

export const Reservations: FunctionalComponent = () => (
  <section id="reservas" class="py-5" style="background:linear-gradient(180deg, black, red)">
    <div class="container text-center text-white">
      <h2 class="display-5 mb-4" style="color:orange; text-shadow:0 0 10px orange">¡Reserva tu mesa ahora!</h2>
      <form class="row g-3 justify-content-center">
        <div class="col-md-6">
          <input type="text" class="form-control" placeholder="Nombre" required />
        </div>
        <div class="col-md-3">
          <input type="date" class="form-control" required />
        </div>
        <div class="col-md-3">
          <input type="time" class="form-control" required />
        </div>
        <div class="col-md-3">
          <input type="number" class="form-control" placeholder="Personas" required />
        </div>
        <div class="col-md-6">
          <input type="tel" class="form-control" placeholder="Contacto" required />
        </div>
        <div class="col-12">
          <button type="submit" class="btn btn-danger btn-lg">Reservar</button>
        </div>
      </form>
    </div>
  </section>
)
