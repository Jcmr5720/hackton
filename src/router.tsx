import { createContext, FunctionalComponent } from 'preact'
import { useContext, useEffect, useState } from 'preact/hooks'

interface Route {
  path: string
  component: FunctionalComponent
}

interface RouterContextProps {
  path: string
  navigate: (path: string) => void
}

const RouterContext = createContext<RouterContextProps | null>(null)

export function BrowserRouter({ routes }: { routes: Route[] }) {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = (p: string) => {
    if (p !== path) {
      window.history.pushState({}, '', p)
      setPath(p)
    }
  }

  const current = routes.find(r => r.path === path) || routes[0]
  const Context = RouterContext.Provider
  return (
    <Context value={{ path, navigate }}>
      {current.component({})}
    </Context>
  )
}

export function Link({ to, children }: { to: string; children: any }) {
  const ctx = useContext(RouterContext)
  const handle = (e: Event) => {
    e.preventDefault()
    ctx?.navigate(to)
  }
  return (
    <a href={to} onClick={handle} style={{ cursor: 'pointer' }}>
      {children}
    </a>
  )
}
