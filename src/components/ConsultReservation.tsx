import { useState, type FormEvent } from 'react'
import { createPortal } from 'react-dom'
import { findReservationByCode, type Reservation } from '../reservations'

declare const bootstrap: any

export default function ConsultReservation() {
  const [code, setCode] = useState('')
  const [reservation, setReservation] = useState<Reservation | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const res = await findReservationByCode(code.trim())
      if (res.success && res.data) {
        setReservation(res.data)
        setError(null)
      } else {
        setReservation(null)
        setError(res.error || 'Reserva no encontrada')
      }
    } catch (err) {
      setReservation(null)
      setError(err instanceof Error ? err.message : 'Error al consultar')
    }
    const el = document.getElementById('consultReservationModal')
    if (el) bootstrap.Modal.getOrCreateInstance(el).show()
  }

  const modal = (
    <div className="modal fade premium-modal" id="consultReservationModal" tabIndex={-1} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <img src="/img/logo.png" alt="logo" style={{ height: '30px' }} />
              Detalles de la reserva
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            {error ? (
              <div className="alert alert-warning d-flex align-items-center" role="alert">
                <i className="bi bi-exclamation-triangle-fill me-2" />
                {error}
              </div>
            ) : reservation && (
              <ul className="list-unstyled mb-0">
                {reservation.customer_username && reservation.customer_username.trim() !== '' && (
                  <li className="mb-2">
                    <i className="bi bi-person-badge-fill me-2" />Nombre de usuario: {reservation.customer_username}
                  </li>
                )}
                <li className="mb-2"><i className="bi bi-person-fill me-2" />Nombre completo: {reservation.customer_name ?? 'N/A'}</li>
                <li className="mb-2"><i className="bi bi-telephone-fill me-2" />Teléfono: {reservation.customer_phone ?? 'N/A'}</li>
                <li className="mb-2"><i className="bi bi-phone-fill me-2" />Celular: {reservation.customer_mobile ?? 'N/A'}</li>
                <li className="mb-2"><i className="bi bi-envelope-fill me-2" />Correo electrónico: {reservation.customer_email ?? 'N/A'}</li>
                <li className="mb-2"><i className="bi bi-calendar-event-fill me-2" />Fecha y hora: {new Date(reservation.reservation_date).toLocaleString()}</li>
                <li className="mb-2"><i className="bi bi-people-fill me-2" />Número de personas: {reservation.number_of_people}</li>
                {reservation.table_number && reservation.table_number.trim() !== '' && (
                  <li className="mb-2">
                    <i className="bi bi-table me-2" />Mesa asignada: {reservation.table_number}
                  </li>
                )}
                <li className="mb-2"><i className="bi bi-chat-square-text-fill me-2" />Peticiones especiales: {reservation.special_requests ?? 'N/A'}</li>
                <li className="mb-2"><i className="bi bi-info-circle-fill me-2" />Estado: {reservation.status}</li>
                <li><i className="bi bi-hash me-2" />Código: {reservation.code}</li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <form className="w-100" style={{ maxWidth: '500px' }} onSubmit={handleSubmit}>
        <div className="input-group shadow rounded-pill overflow-hidden">
          <span className="input-group-text bg-white border-0">
            <i className="bi bi-search" />
          </span>
          <input
            type="text"
            className="form-control border-0"
            placeholder="Ingresa tu código de reserva"
            value={code}
            onChange={e => setCode(e.target.value)}
          />
          <button className="btn btn-reserva border-0 rounded-0 rounded-end" type="submit">
            <i className="bi bi-search me-2" />
            Consultar
          </button>
        </div>
      </form>
      {createPortal(modal, document.body)}
    </>
  )
}
