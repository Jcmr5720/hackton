export default function BuyModal() {
  return (
    <div className="modal fade premium-modal" id="buyPromptModal" tabIndex={-1} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <img src="/img/logo.png" alt="logo" style={{ height: '30px' }} />
              Aviso de compra
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
          <div className="modal-body text-center">
            <p className="lead mb-4">Primero debes registrarte para poder comprar.</p>
            <button
              type="button"
              className="btn premium-submit w-100"
              data-bs-dismiss="modal"
              data-bs-toggle="modal"
              data-bs-target="#registerModal"
            >
              Ir al registro
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
