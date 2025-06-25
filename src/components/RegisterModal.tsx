import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const API_URL = import.meta.env.VITE_API_URL || ''

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

const countries = [
  { value: 'AR', label: 'Argentina', cities: ['Buenos Aires', 'C\u00f3rdoba', 'Rosario'] },
  { value: 'MX', label: 'M\u00e9xico', cities: ['Ciudad de M\u00e9xico', 'Guadalajara', 'Monterrey'] },
  { value: 'US', label: 'Estados Unidos', cities: ['New York', 'Los Angeles', 'Chicago'] },
  { value: 'ES', label: 'Espa\u00f1a', cities: ['Madrid', 'Barcelona', 'Valencia'] }
] as const

const countryOptions = countries.map(c => ({ value: c.label, label: c.label }))

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
  const [cityOptions, setCityOptions] = useState<{ value: string; label: string }[]>([])
  const [birthDate, setBirthDate] = useState<Date | null>(null)
  const maxBirthDate = new Date('2007-12-31')

  async function checkAvailability(field: 'username' | 'email', value: string) {
    if (!value) return
    try {
      const res = await fetch(`${API_URL}/auth/check?${field}=${encodeURIComponent(value)}`)
      const data = await res.json()
      if (data[`${field}Exists`]) {
        setErrors(err => ({ ...err, [field]: `${field === 'username' ? 'Nombre de usuario' : 'Correo'} no disponible` }))
      } else {
        setErrors(err => {
          const { [field]: _removed, ...rest } = err
          return rest
        })
      }
    } catch {
      /* ignore */
    }
  }

  function updateField(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  function updateCountry(option: { value: string; label: string } | null) {
    const country = option ? option.label : ''
    setForm(f => ({ ...f, country, city: '' }))
    const found = countries.find(c => c.label === country)
    setCityOptions(found ? found.cities.map(cty => ({ value: cty, label: cty })) : [])
    setErrors(err => {
      const { country: _c, city: _ci, ...rest } = err
      return rest
    })
  }

  function updateCity(option: { value: string; label: string } | null) {
    const city = option ? option.label : ''
    setForm(f => ({ ...f, city }))
    setErrors(err => {
      const { city: _ci, ...rest } = err
      return rest
    })
  }

  function updateBirth(date: Date | null) {
    setBirthDate(date)
    const str = date ? date.toISOString().split('T')[0] : ''
    setForm(f => ({ ...f, birth_date: str }))
    if (date && date > maxBirthDate) {
      setErrors(err => ({ ...err, birth_date: 'Debes ser mayor de edad para registrarte.' }))
    } else {
      setErrors(err => {
        const { birth_date, ...rest } = err
        return rest
      })
    }
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
    const reqFields = ['username', 'user', 'email', 'repeat_email', 'password', 'repeat_password', 'country', 'city', 'birth_date']
    const newErrors: Record<string, string> = {}
    for (const field of reqFields) {
      if (!form[field as keyof FormState]) newErrors[field] = 'Campo requerido'
    }
    if (!form.accepted_terms) newErrors.accepted_terms = 'Debes aceptar los términos'
    if (form.birth_date && new Date(form.birth_date) > maxBirthDate) {
      newErrors.birth_date = 'Debes ser mayor de edad para registrarte.'
    }
    if (form.email !== form.repeat_email) newErrors.repeat_email = 'Los correos no coinciden'
    if (form.password !== form.repeat_password) newErrors.repeat_password = 'Las contraseñas no coinciden'
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
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
        setBirthDate(null)
        setCityOptions([])
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
                    maxDate={maxBirthDate}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Selecciona fecha"
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
                  <div className="flex-grow-1">
                    <Select
                      classNamePrefix="premium-select"
                      options={countryOptions}
                      value={countryOptions.find(c => c.label === form.country) || null}
                      onChange={updateCountry}
                      placeholder="Selecciona un país"
                    />
                  </div>
                </div>
                {errors.country && <div className="invalid-feedback d-block">{errors.country}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Ciudad</label>
                <div className="input-group dark-input-group">
                  <span className="input-group-text"><i className="bi bi-building" /></span>
                  <div className="flex-grow-1">
                    <Select
                      classNamePrefix="premium-select"
                      options={cityOptions}
                      value={cityOptions.find(c => c.label === form.city) || null}
                      onChange={updateCity}
                      placeholder="Selecciona una ciudad"
                      isDisabled={cityOptions.length === 0}
                    />
                  </div>
                </div>
                {errors.city && <div className="invalid-feedback d-block">{errors.city}</div>}
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
