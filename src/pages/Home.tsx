import { FunctionalComponent } from 'preact'
import { Carousel } from '../components/Carousel'
import { Reservations } from '../components/Reservations'

export const Home: FunctionalComponent = () => {
  return (
    <>
      <Carousel />
      <Reservations />
    </>
  )
}
