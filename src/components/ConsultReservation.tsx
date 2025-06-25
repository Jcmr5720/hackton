import React from 'react'

export default function ConsultReservation() {
  return (
    <>
      <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3 mt-3">
        <button
          className="btn btn-reserva shadow-lg rounded-pill d-flex align-items-center"
          data-bs-toggle="modal"
          data-bs-target="#checkReservationModal"
        >
          <i className="bi bi-search fs-3 me-2" />
          Consulta tu reserva
        </button>
        <form className="w-100" style={{ maxWidth: '500px' }}>
          <div className="input-group shadow rounded-pill overflow-hidden">
            <span className="input-group-text bg-white border-0">
              <i className="bi bi-search" />
            </span>
            <input
              type="text"
              className="form-control border-0"
              placeholder="Ingresa tu código de reserva"
            />
            <button className="btn btn-reserva border-0 rounded-0 rounded-end" type="submit">
              <i className="bi bi-search me-2" />
              Consultar
            </button>
          </div>
        </form>
      </div>

      <div className="modal fade premium-modal" id="checkReservationModal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                <i className="bi bi-search me-2" />Consulta tu reserva
              </h5>
              <button type="button" className="modal-close-btn" data-bs-dismiss="modal" aria-label="Close">
                <i className="bi bi-x-lg" />
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Código de reserva</label>
                  <div className="input-group dark-input-group">
                    <span className="input-group-text"><i className="bi bi-search" /></span>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Email asociado</label>
                  <div className="input-group dark-input-group">
                    <span className="input-group-text"><i className="bi bi-envelope" /></span>
                    <input type="email" className="form-control" />
                  </div>
                </div>
                <button type="submit" className="btn premium-submit w-100 rounded-pill fw-bold">
                  Buscar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
