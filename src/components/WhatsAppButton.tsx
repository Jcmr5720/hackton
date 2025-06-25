import React, { useState } from 'react'

export default function WhatsAppButton() {
  const [hover, setHover] = useState(false)
  return (
    <a
      href="https://wa.me/573154484804"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="btn text-white d-flex align-items-center justify-content-center position-fixed bottom-0 end-0 mb-4 me-4 rounded-circle shadow"
      style={{
        backgroundColor: '#25D366',
        width: '64px',
        height: '64px',
        transition: 'transform 0.2s',
        transform: hover ? 'scale(1.1)' : 'scale(1)'
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <i className="bi bi-whatsapp fs-1" />
    </a>
  )
}
