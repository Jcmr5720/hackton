import { h } from 'preact'

export function Footer() {
  return (
    <footer class="py-4" style="background:black;color:white">
      <div class="container text-center">
        <p class="mb-1">&copy; {new Date().getFullYear()} Al Rock Burger</p>
        <div class="mb-2">
          <a href="#" class="me-3" style="color:orange">Facebook</a>
          <a href="#" class="me-3" style="color:orange">Instagram</a>
          <a href="#" style="color:orange">Twitter</a>
        </div>
        <p class="mb-0" style="color:red">Av. Principal 123, Ciudad</p>
      </div>
    </footer>
  )
}
