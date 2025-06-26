import Products from '../components/Products'

export default function PublicProfile() {
  const profile = {
    color: '#ff5722',
    coverUrl: '/img/snippet1.webp',
    avatarUrl: '/img/logo.png',
    name: 'Juan Pérez',
    username: 'juanp',
    role: 'admin',
    gender: 'Masculino',
    age: 30,
    country: 'Colombia',
    lastConnection: '2024-05-10T12:34:56Z',
    status: 'online',
    about:
      'Apasionado por el desarrollo web y la fotografía. Me encanta compartir mis proyectos y conectar con nuevas personas.',
    socials: [
      { name: 'Facebook', icon: 'facebook', url: '#' },
      { name: 'Instagram', icon: 'instagram', url: '#' },
      { name: 'Twitter', icon: 'twitter', url: '#' },
    ],
  }

  return (
    <div className="container py-5">
      <div className="position-relative mb-5">
        <div
          className="rounded-4 shadow profile-cover"
          style={{
            backgroundImage: profile.coverUrl
              ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${profile.coverUrl})`
              : `linear-gradient(135deg, ${profile.color}, ${profile.color}99)`,
            backgroundColor: profile.color,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '210px',
          }}
        />
        <img
          src={profile.avatarUrl}
          alt={profile.name}
          className="rounded-circle border border-3 position-absolute top-100 start-50 translate-middle profile-avatar"
        />
      </div>
      <div className="text-center mt-5 pt-3">
        <h2 className="fw-bold mb-1">{profile.name}</h2>
        <div className="d-flex justify-content-center align-items-center gap-2">
          <span className="text-muted">@{profile.username}</span>
          <span className="badge bg-primary text-uppercase">{profile.role}</span>
        </div>
      </div>

      <div className="row justify-content-center mt-4">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="card shadow-lg rounded-4 p-4 bg-white">
            <div className="row g-3 text-center text-md-start">
              <div className="col-6 col-md-4">
                <i className="bi bi-gender-ambiguous me-2" />{profile.gender}
              </div>
              <div className="col-6 col-md-4">
                <i className="bi bi-calendar-heart me-2" />{profile.age} años
              </div>
              <div className="col-6 col-md-4">
                <i className="bi bi-geo-alt-fill me-2" />{profile.country}
              </div>
              <div className="col-6 col-md-4">
                <i className="bi bi-clock-history me-2" />
                {new Date(profile.lastConnection).toLocaleDateString()}
              </div>
              <div className="col-6 col-md-4">
                <span
                  className={`badge ${
                    profile.status === 'online' ? 'bg-success' : 'bg-secondary'
                  }`}
                >
                  {profile.status}
                </span>
              </div>
            </div>
            <div className="mt-4 p-3 rounded-3 bg-light">
              <h6 className="fw-bold">Acerca de</h6>
              <p className="mb-0">{profile.about}</p>
            </div>
            <div className="mt-4 d-flex justify-content-center gap-3 fs-4">
              {profile.socials.map(s => (
                <a
                  key={s.name}
                  href={s.url}
                  className="text-dark"
                  target="_blank"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title={s.name}
                >
                  <i className={`bi bi-${s.icon}`} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="mt-5">
        <h4 className="mb-3">
          <i className="bi bi-box-seam me-2" />Productos publicados
        </h4>
        <hr />
        <Products />
      </section>
    </div>
  )
}

