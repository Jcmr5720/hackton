import React from 'react'

export default function LoginModal() {
  return (
    <div className="modal fade premium-modal" id="loginModal" tabIndex={-1} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <img src="/img/logo.png" alt="logo" style={{ height: '30px' }} />
              Inicia sesión
            </h5>
            <button type="button" className="btn-close rounded-circle" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="form-label">Usuario o correo</label>
                <div className="input-group dark-input-group">
                  <span className="input-group-text"><i className="bi bi-person-fill" /></span>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <div className="input-group dark-input-group">
                  <span className="input-group-text"><i className="bi bi-lock-fill" /></span>
                  <input type="password" className="form-control" />
                </div>
              </div>
              <button type="submit" className="btn premium-submit w-100">Ingresar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
