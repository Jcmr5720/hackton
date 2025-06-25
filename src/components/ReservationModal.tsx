import React, { useState } from 'react'

interface FormState {
  customer_name: string
  customer_phone: string
  customer_mobile: string
  customer_email: string
  reservation_date: string
  number_of_people: string
  special_requests: string
}

export default function ReservationModal() {
  const [form, setForm] = useState<FormState>({
    customer_name: '',
    customer_phone: '',
    customer_mobile: '',
    customer_email: '',
    reservation_date: '',
    number_of_people: '1',
    special_requests: ''
  })
  const [message, setMessage] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  function updateField(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    try {
      const res = await fetch('/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          number_of_people: parseInt(form.number_of_people)
        })
      })
      const data = await res.json()
      if (res.ok) {
        setSuccess(true)
        setMessage('Reserva creada exitosamente')
        setForm({
          customer_name: '',
          customer_phone: '',
          customer_mobile: '',
          customer_email: '',
          reservation_date: '',
          number_of_people: '1',
          special_requests: ''
        })
      } else {
        setSuccess(false)
        setMessage(data.error || 'Error al crear la reserva')
      }
    } catch (err) {
      setSuccess(false)
      setMessage('Error al crear la reserva')
    }
  }

  return (
    <div className="modal fade premium-modal" id="reservationModal" tabIndex={-1} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered animate__animated animate__zoomIn">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <img src="/img/logo.png" alt="logo" style={{ height: '30px' }} />
              Haz tu reserva
            </h5>
            <button type="button" className="btn-close rounded-circle" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {message && (
              <div className={`alert ${success ? 'alert-success' : 'alert-danger'}`} role="alert">
                {message}
              </div>
            )}
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  name="customer_name"
                  className="form-control"
                  value={form.customer_name}
                  onChange={updateField}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Teléfono</label>
                <input
                  type="text"
                  name="customer_phone"
                  className="form-control"
                  value={form.customer_phone}
                  onChange={updateField}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Móvil *</label>
                <input
                  type="text"
                  name="customer_mobile"
                  className="form-control"
                  value={form.customer_mobile}
                  onChange={updateField}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="customer_email"
                  className="form-control"
                  value={form.customer_email}
                  onChange={updateField}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Fecha y hora *</label>
                <input
                  type="datetime-local"
                  name="reservation_date"
                  className="form-control"
                  value={form.reservation_date}
                  onChange={updateField}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Número de personas *</label>
                <input
                  type="number"
                  name="number_of_people"
                  className="form-control"
                  value={form.number_of_people}
                  onChange={updateField}
                  min="1"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Peticiones especiales</label>
                <textarea
                  name="special_requests"
                  className="form-control"
                  rows={3}
                  value={form.special_requests}
                  onChange={updateField}
                />
              </div>
              <button type="submit" className="btn premium-submit w-100 rounded-pill fw-bold">
                Reservar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
