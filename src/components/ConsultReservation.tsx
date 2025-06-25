import React, { useState } from 'react'
import { findReservationByCode } from '../reservations'

export default function ConsultReservation() {
  const [code, setCode] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await findReservationByCode(code.trim())
      if (res.success && res.data) {
        const date = new Date(res.data.reservation_date).toLocaleString()
        setSuccess(true)
        setMessage(`Reserva de ${res.data.customer_name ?? 'N/A'} el ${date}`)
      } else {
        setSuccess(false)
        setMessage(res.error || 'Reserva no encontrada')
      }
    } catch (err) {
      setSuccess(false)
      setMessage(err instanceof Error ? err.message : 'Error al consultar')
    }
  }

  return (
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
      {message && (
        <div className={`alert mt-3 ${success ? 'alert-success' : 'alert-danger'}`} role="alert">
          {message}
        </div>
      )}
    </form>
  )
}
