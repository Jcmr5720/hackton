import React, { useEffect, useState } from 'react'

// Backend interactions removed

interface Product {
  id: number
  image: string
  title: string
  description: string
  price: number
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Backend removed; no data loading
    setProducts([])
  }, [])

  function formatPrice(value: number) {
    return value.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })
  }

  return (
    <section id="productos" className="py-5">
      <div className="container">
        <h2 className="mb-4 text-center">Productos</h2>
        {loading ? (
          <p className="text-center">Cargando...</p>
        ) : products.length === 0 ? (
          <p className="text-center">No hay productos disponibles.</p>
        ) : (
          <div className="row g-4">
            {products.map(prod => (
              <div key={prod.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="card h-100 shadow-lg border-0 product-card">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="card-img-top product-img"
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold">{prod.title}</h5>
                    <p className="card-text text-muted flex-grow-1">
                      {prod.description}
                    </p>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <span className="badge bg-warning text-dark fs-6">
                        {formatPrice(prod.price)}
                      </span>
                      <button className="btn btn-primary">Reservar</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
