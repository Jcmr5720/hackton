import { h } from 'preact'

export function Contact() {
  return (
    <section id="contacto" class="py-5 bg-light">
      <div class="container">
        <h2 class="mb-4 text-center">Contáctanos</h2>
        <div class="row">
          <div class="col-md-6 mb-4">
            <form>
              <div class="mb-3">
                <label class="form-label">Nombre</label>
                <input type="text" class="form-control" />
              </div>
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" />
              </div>
              <div class="mb-3">
                <label class="form-label">Mensaje</label>
                <textarea class="form-control" rows={4}></textarea>
              </div>
              <button type="submit" class="btn btn-primary">Enviar</button>
            </form>
          </div>
          <div class="col-md-6">
            <iframe class="w-100 h-100" style="min-height:300px" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093747!2d144.95373531531683!3d-37.81627974202192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad6433c5947fffd%3A0xb57f4c15c6c9f36d!2sVictoria%20Market!5e0!3m2!1sen!2sau!4v1602817815952!5m2!1sen!2sau" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}
