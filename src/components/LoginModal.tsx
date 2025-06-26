import { useState, type FormEvent } from 'react'
import { loginUser } from '../auth'

export default function LoginModal() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await loginUser(email, password, window.location.hostname)
      setSuccess(true)
      setMessage('Inicio de sesión exitoso')
      setEmail('')
      setPassword('')
    } catch (err) {
      setSuccess(false)
      setMessage(err instanceof Error ? err.message : 'Error al iniciar sesión')
    }
  }

  return (
    <div className="modal fade premium-modal" id="loginModal" tabIndex={-1} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <img src="/img/logo.png" alt="logo" style={{ height: '30px' }} />
              Inicia sesión
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
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Usuario o correo</label>
                <div className="input-group dark-input-group">
                  <span className="input-group-text"><i className="bi bi-person-fill" /></span>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <div className="input-group dark-input-group">
                  <span className="input-group-text"><i className="bi bi-lock-fill" /></span>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
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
