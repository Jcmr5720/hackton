import React from 'react'

export default function ConsultReservation() {
  return (
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
  )
}
