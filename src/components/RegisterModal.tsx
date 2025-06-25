import React, { useState, useEffect } from 'react'

interface FormState {
  username: string
  user: string
  role: string
  email: string
  repeat_email: string
  password: string
  repeat_password: string
  phone: string
  birth_date: string
  address: string
  country: string
  city: string
  accepted_terms: boolean
}

export default function RegisterModal() {
  const [form, setForm] = useState<FormState>({
    username: '',
    user: '',
    role: 'user',
    email: '',
    repeat_email: '',
    password: '',
    repeat_password: '',
    phone: '',
    birth_date: '',
    address: '',
    country: '',
    city: '',
    accepted_terms: false
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [message, setMessage] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  function updateField(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  useEffect(() => {
    if (form.repeat_email && form.email !== form.repeat_email) {
      setErrors(err => ({ ...err, repeat_email: 'Los correos no coinciden' }))
    } else {
      setErrors(err => {
        const { repeat_email, ...rest } = err
        return rest
      })
    }
  }, [form.email, form.repeat_email])

  useEffect(() => {
    if (form.repeat_password && form.password !== form.repeat_password) {
      setErrors(err => ({ ...err, repeat_password: 'Las contraseñas no coinciden' }))
    } else {
      setErrors(err => {
        const { repeat_password, ...rest } = err
        return rest
      })
    }
  }, [form.password, form.repeat_password])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const reqFields = ['username', 'user', 'email', 'repeat_email', 'password', 'repeat_password']
    const newErrors: Record<string, string> = {}
    for (const field of reqFields) {
      if (!form[field as keyof FormState]) newErrors[field] = 'Campo requerido'
    }
    if (!form.accepted_terms) newErrors.accepted_terms = 'Debes aceptar los términos'
    if (form.email !== form.repeat_email) newErrors.repeat_email = 'Los correos no coinciden'
    if (form.password !== form.repeat_password) newErrors.repeat_password = 'Las contraseñas no coinciden'
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    try {
      const res = await fetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: form.username,
          user: form.user,
          role: form.role,
          email: form.email,
          password: form.password,
          accepted_terms: form.accepted_terms,
          phone: form.phone || undefined,
          birth_date: form.birth_date || undefined,
          address: form.address || undefined,
          country: form.country || undefined,
          city: form.city || undefined
        })
      })
      const data = await res.json()
      if (res.ok) {
        setSuccess(true)
        setMessage('Usuario registrado correctamente')
        setForm({
          username: '',
          user: '',
          role: 'user',
          email: '',
          repeat_email: '',
          password: '',
          repeat_password: '',
          phone: '',
          birth_date: '',
          address: '',
          country: '',
          city: '',
          accepted_terms: false
        })
      } else {
        setSuccess(false)
        setMessage(data.error || 'Error al registrar')
      }
    } catch (err) {
      setSuccess(false)
      setMessage('Error al registrar')
    }
  }

  return (
    <div className="modal fade" id="registerModal" tabIndex={-1} aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Crea tu cuenta</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {message && (
              <div className={`alert ${success ? 'alert-success' : 'alert-danger'}`} role="alert">
                {message}
              </div>
            )}
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label className="form-label">Nombre de usuario</label>
                <input
                  name="username"
                  type="text"
                  className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                  value={form.username}
                  onChange={updateField}
                />
                {errors.username && <div className="invalid-feedback">{errors.username}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  name="user"
                  type="text"
                  className={`form-control ${errors.user ? 'is-invalid' : ''}`}
                  value={form.user}
                  onChange={updateField}
                />
                {errors.user && <div className="invalid-feedback">{errors.user}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Correo electrónico</label>
                <input
                  name="email"
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  value={form.email}
                  onChange={updateField}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Repite tu correo electrónico</label>
                <input
                  name="repeat_email"
                  type="email"
                  className={`form-control ${errors.repeat_email ? 'is-invalid' : ''}`}
                  value={form.repeat_email}
                  onChange={updateField}
                />
                {errors.repeat_email && <div className="invalid-feedback">{errors.repeat_email}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input
                  name="password"
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  value={form.password}
                  onChange={updateField}
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Repite tu contraseña</label>
                <input
                  name="repeat_password"
                  type="password"
                  className={`form-control ${errors.repeat_password ? 'is-invalid' : ''}`}
                  value={form.repeat_password}
                  onChange={updateField}
                />
                {errors.repeat_password && <div className="invalid-feedback">{errors.repeat_password}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Teléfono</label>
                <input
                  name="phone"
                  type="text"
                  className="form-control"
                  value={form.phone}
                  onChange={updateField}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Fecha de nacimiento</label>
                <input
                  name="birth_date"
                  type="date"
                  className="form-control"
                  value={form.birth_date}
                  onChange={updateField}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Dirección</label>
                <input
                  name="address"
                  type="text"
                  className="form-control"
                  value={form.address}
                  onChange={updateField}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">País</label>
                <input
                  name="country"
                  type="text"
                  className="form-control"
                  value={form.country}
                  onChange={updateField}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Ciudad</label>
                <input
                  name="city"
                  type="text"
                  className="form-control"
                  value={form.city}
                  onChange={updateField}
                />
              </div>
              <div className="form-check mb-3">
                <input
                  name="accepted_terms"
                  className={`form-check-input ${errors.accepted_terms ? 'is-invalid' : ''}`}
                  type="checkbox"
                  checked={form.accepted_terms}
                  onChange={updateField}
                />
                <label className="form-check-label">Acepto los términos y condiciones</label>
                {errors.accepted_terms && <div className="invalid-feedback">{errors.accepted_terms}</div>}
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Registrarse
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
