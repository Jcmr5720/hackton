import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { registerUser } from '../auth'

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
  const [birthDate, setBirthDate] = useState<Date | null>(null)

  function checkAvailability(_field: 'username' | 'email', _value: string) {
    // No backend, validation skipped
    return
  }

  function updateField(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const target = e.target as HTMLInputElement
    const { name, value, type } = target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? target.checked : value }))
  }



  function updateBirth(date: Date | null) {
    setBirthDate(date)
    const str = date ? date.toISOString().split('T')[0] : ''
    setForm(f => ({ ...f, birth_date: str }))
    setErrors(err => {
      const { birth_date, ...rest } = err
      return rest
    })
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const reqFields = ['username', 'user', 'email', 'repeat_email', 'password', 'repeat_password', 'country', 'city', 'birth_date']
    const newErrors: Record<string, string> = {}
    for (const field of reqFields) {
      if (!form[field as keyof FormState]) newErrors[field] = 'Campo requerido'
    }
    if (!form.accepted_terms) newErrors.accepted_terms = 'Debes aceptar los términos'
    if (form.email !== form.repeat_email) newErrors.repeat_email = 'Los correos no coinciden'
    if (form.password !== form.repeat_password) newErrors.repeat_password = 'Las contraseñas no coinciden'
    setErrors(newErrors)
    for (const [field, msg] of Object.entries(newErrors)) {
      console.error(`Error en ${field}: ${msg}`)
    }
    if (Object.keys(newErrors).length > 0) return

    try {
      await registerUser({
        username: form.username,
        user: form.user,
        email: form.email,
        password: form.password,
        phone: form.phone,
        birth_date: form.birth_date,
        address: form.address,
        accepted_terms: form.accepted_terms,
        registration_ip: window.location.hostname,
        country: form.country,
        city: form.city
      })
      setSuccess(true)
      setMessage('Registro exitoso')
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
      setBirthDate(null)
    } catch (err) {
      setSuccess(false)
      setMessage(err instanceof Error ? err.message : 'Error al registrar')
    }
  }

  return (
    <div className="modal fade premium-modal" id="registerModal" tabIndex={-1} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <img src="/img/logo.png" alt="logo" style={{ height: '30px' }} />
              Crea tu cuenta
            </h5>
            <button
              type="button"
              className="modal-close-btn"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i className="bi bi-x-lg" />
            </button>
          </div>
          <div className="modal-body">
            {message && (
              <div className={`alert ${success ? 'alert-success' : 'alert-danger'}`} role="alert">
                {message}
              </div>
            )}
            <form onSubmit={handleSubmit} noValidate>
              <h6 className="premium-modal-section-title">Cuenta</h6>
              <div className="mb-3">
                <label className="form-label">Nombre de usuario</label>
                <div className="input-group dark-input-group">
                  <span className="input-group-text"><i className="bi bi-person-fill" /></span>
                  <input
                    name="username"
                    type="text"
                    className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                    value={form.username}
                    onChange={updateField}
                    onBlur={e => checkAvailability('username', e.target.value)}
                  />
                </div>
                {errors.username && <div className="invalid-feedback">{errors.username}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <div className="input-group dark-input-group">
                  <span className="input-group-text"><i className="bi bi-person-badge-fill" /></span>
                  <input
                    name="user"
                    type="text"
                    className={`form-control ${errors.user ? 'is-invalid' : ''}`}
                    value={form.user}
                    onChange={updateField}
                  />
                </div>
                {errors.user && <div className="invalid-feedback">{errors.user}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Correo electrónico</label>
                <div className="input-group dark-input-group">
                  <span className="input-group-text"><i className="bi bi-envelope-fill" /></span>
                  <input
                    name="email"
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    value={form.email}
                    onChange={updateField}
                    onBlur={e => checkAvailability('email', e.target.value)}
                  />
                </div>
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Repite tu correo electrónico</label>
                <div className="input-group dark-input-group">
                  <span className="input-group-text"><i className="bi bi-envelope-fill" /></span>
                  <input
                    name="repeat_email"
                    type="email"
                    className={`form-control ${errors.repeat_email ? 'is-invalid' : ''}`}
                    value={form.repeat_email}
                    onChange={updateField}
                  />
                </div>
                {errors.repeat_email && <div className="invalid-feedback">{errors.repeat_email}</div>}
              </div>

              <h6 className="premium-modal-section-title">Seguridad</h6>
              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <div className="input-group dark-input-group">
                  <span className="input-group-text"><i className="bi bi-lock-fill" /></span>
                  <input
                    name="password"
                    type="password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    value={form.password}
                    onChange={updateField}
                  />
                </div>
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Repite tu contraseña</label>
                <div className="input-group dark-input-group">
                  <span className="input-group-text"><i className="bi bi-lock-fill" /></span>
                  <input
                    name="repeat_password"
                    type="password"
                    className={`form-control ${errors.repeat_password ? 'is-invalid' : ''}`}
                    value={form.repeat_password}
                    onChange={updateField}
                  />
                </div>
                {errors.repeat_password && <div className="invalid-feedback">{errors.repeat_password}</div>}
              </div>

              <h6 className="premium-modal-section-title">Datos personales</h6>
              <div className="mb-3">
                <label className="form-label">Teléfono</label>
                <div className="input-group dark-input-group">
                  <span className="input-group-text"><i className="bi bi-telephone-fill" /></span>
                  <input
                    name="phone"
                    type="text"
                    className="form-control"
                    value={form.phone}
                    onChange={updateField}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Fecha de nacimiento</label>
                <div className="input-group dark-input-group">
                  <span className="input-group-text"><i className="bi bi-calendar-date-fill" /></span>
                  <DatePicker
                    selected={birthDate}
                    onChange={updateBirth}
                    className={`form-control ${errors.birth_date ? 'is-invalid' : ''}`}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Selecciona fecha"
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={100}
                    maxDate={new Date()}
                  />
                </div>
                {errors.birth_date && <div className="invalid-feedback d-block">{errors.birth_date}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Dirección</label>
                <div className="input-group dark-input-group">
                  <span className="input-group-text"><i className="bi bi-geo-alt-fill" /></span>
                  <input
                    name="address"
                    type="text"
                    className="form-control"
                    value={form.address}
                    onChange={updateField}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">País</label>
                <div className="input-group dark-input-group">
                  <span className="input-group-text"><i className="bi bi-flag-fill" /></span>
                  <input
                    name="country"
                    type="text"
                    className={`form-control ${errors.country ? 'is-invalid' : ''}`}
                    value={form.country}
                    onChange={updateField}
                  />
                </div>
                {errors.country && <div className="invalid-feedback">{errors.country}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Ciudad</label>
                <div className="input-group dark-input-group">
                  <span className="input-group-text"><i className="bi bi-building" /></span>
                  <input
                    name="city"
                    type="text"
                    className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                    value={form.city}
                    onChange={updateField}
                  />
                </div>
                {errors.city && <div className="invalid-feedback">{errors.city}</div>}
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
              <button type="submit" className="btn premium-submit w-100">
                Registrarse
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
