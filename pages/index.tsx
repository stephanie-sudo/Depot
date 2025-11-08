import HeroSection from '../components/sections/HeroSection'
import ServiceTeasers from '../components/sections/ServiceTeasers'
import AboutTeaser from '../components/sections/AboutTeaser'
import UpcomingEvents from '../components/UpcomingEvents'

export default function Home() {
  return (
    <main>
      <UpcomingEvents />
      <HeroSection />
      <ServiceTeasers />
      <AboutTeaser />
    </main>
  )
}
