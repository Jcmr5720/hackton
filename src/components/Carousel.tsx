import { type FunctionalComponent } from 'preact'

export const Carousel: FunctionalComponent = () => (
  <div id="mainCarousel" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="https://via.placeholder.com/800x400.png?text=Snippet+1" class="d-block w-100" alt="slide 1" />
        <div class="carousel-caption d-none d-md-block">
          <h5 class="fw-bold text-white" style={{textShadow:'0 0 10px orange'}}>El sabor que hace vibrar tus sentidos</h5>
        </div>
      </div>
      <div class="carousel-item">
        <img src="https://via.placeholder.com/800x400.png?text=Snippet+2" class="d-block w-100" alt="slide 2" />
        <div class="carousel-caption d-none d-md-block">
          <h5 class="fw-bold text-white" style={{textShadow:'0 0 10px orange'}}>Rockea cada mordida</h5>
        </div>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#mainCarousel" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#mainCarousel" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
)
