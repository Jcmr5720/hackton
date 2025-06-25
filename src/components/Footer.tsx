import { h } from 'preact'

export function Footer() {
  return (
    <footer class="bg-dark text-white py-4">
      <div class="container text-center">
        <p class="mb-1">&copy; {new Date().getFullYear()} Alrock Burger</p>
        <div class="mb-2">
          <a href="#" class="text-white me-3">Facebook</a>
          <a href="#" class="text-white me-3">Instagram</a>
          <a href="#" class="text-white">Twitter</a>
        </div>
        <p class="mb-0">Av. Principal 123, Ciudad</p>
      </div>
    </footer>
  )
}
