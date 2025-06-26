export default function Footer() {
  return (
    <footer className="premium-footer mt-auto pt-5 text-white">
      <div className="container">
        <div className="row gy-4 justify-content-center text-center text-md-start align-items-center">
          <div className="col-12 col-md-3 d-flex justify-content-center mb-4 mb-md-0">
            <img
              src="/img/logo.png"
              alt="Al Rock Burger Logo"
              className="footer-logo-large"
            />
          </div>
          <div className="col-12 col-md-3">
            <h6 className="fw-bold mb-3">Contacto</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><i className="bi bi-telephone-fill me-2 text-brand"></i>601 589 2485 | 318 88 88 936</li>
              <li className="mb-2"><i className="bi bi-geo-alt-fill me-2 text-brand"></i>Carrera 19 No. 148-65</li>
              <li><i className="bi bi-envelope-fill me-2 text-brand"></i>alrockburger.com</li>
            </ul>
          </div>
          <div className="col-12 col-md-2">
            <h6 className="fw-bold mb-3">Enlaces</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="footer-link">Inicio</a></li>
              <li className="mb-2"><a href="#" className="footer-link">Menú</a></li>
              <li className="mb-2"><a href="#" className="footer-link">Promociones</a></li>
              <li className="mb-2"><a href="#" className="footer-link">Reservas</a></li>
              <li><a href="#" className="footer-link">Contacto</a></li>
            </ul>
          </div>
          <div className="col-12 col-md-2">
            <h6 className="fw-bold mb-3">Horario</h6>
            <ul className="list-unstyled">
              <li>Lun-Vie: 12:00 - 23:00</li>
              <li>Sáb-Dom: 13:00 - 01:00</li>
            </ul>
          </div>
          <div className="col-12 col-md-2">
            <h6 className="fw-bold mb-3">Síguenos</h6>
            <div className="d-flex gap-2">
              <a href="#" className="social-icon"><i className="bi bi-facebook"></i></a>
              <a
                href="https://www.instagram.com/alrock_burger/?hl=es"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="social-icon"><i className="bi bi-whatsapp"></i></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom text-center mt-5 pt-3">
          <p className="mb-2">&copy; {new Date().getFullYear()} Todos los derechos reservados.</p>
          <p className="footer-credit fw-semibold">
            Página creada por Juan Camilo Muñoz
            <a
              href="https://portafoliojcmr.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-warning btn-sm ms-2"
            >
              <i className="bi bi-briefcase-fill me-1"></i>
              Portafolio
            </a>
          </p>
          <div className="text-center mt-3">
            <span className="badge text-bg-light text-dark border border-warning px-3 py-2">
              Página creada para el concurso Talento Tech
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
