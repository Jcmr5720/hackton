
export default function Contact() {
  return (
    <section id="contacto" className="py-5 bg-light">
      <div className="container">
        <h2 className="mb-4 text-center">Contáctanos</h2>
        <div className="row">
          <div className="col-md-6 mb-4">
            <form>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Mensaje</label>
                <textarea className="form-control" rows={4}></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
          </div>
          <div className="col-md-6">
            <iframe
              className="w-100 h-100"
              style={{ minHeight: '300px' }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093747!2d144.95373531531683!3d-37.81627974202192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad6433c5947fffd%3A0xb57f4c15c6c9f36d!2sVictoria%20Market!5e0!3m2!1sen!2sau!4v1602817815952!5m2!1sen!2sau"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}
