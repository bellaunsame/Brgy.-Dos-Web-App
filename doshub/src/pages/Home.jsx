import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import Container from '../components/Container'
import NewsCard from '../components/Card/NewsCard'
import EventCard from '../components/Card/EventCard'
import ServiceCard from '../components/Card/ServiceCard'
import { newsData, eventsData, servicesData } from '../data/sampleData'

/**
 * Home page component showcasing latest news, events, and services
 * Sets page title and meta description for SEO
 */
function Home() {
  // Update document title and meta description when component mounts
  useEffect(() => {
    document.title = 'DosHub | Balita, Events, at Serbisyong Barangay'
    // For production, consider using a head management solution like React Helmet
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Ang opisyal na website ng Barangay Dos para sa mga balita, events, at serbisyong pampubliko.'
      )
    }
  }, [])

  // Get latest 3 items from each category
  const latestNews = newsData.slice(0, 3)
  const upcomingEvents = eventsData
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3)
  const featuredServices = servicesData.slice(0, 3)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-primary-600 text-white py-20 -mt-8 mb-12">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              DosHub
              <span className="block text-xl md:text-2xl font-normal mt-2">
                Balita, Events, at Serbisyong Barangay
              </span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-primary-50">
              Ang inyong one-stop hub para sa mga pinakabagong balita, 
              kaganapan, at mga serbisyong pampubliko sa ating komunidad.
            </p>
            <Link
              to="/news"
              className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              Basahin ang Balita
            </Link>
          </div>
        </Container>
        
        {/* Decorative pattern */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Latest News Section */}
      <section className="mb-16">
        <Container>
          <div className="flex justify-between items-baseline mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Pinakabagong Balita</h2>
            <Link 
              to="/news"
              className="text-primary-600 hover:text-primary-700"
            >
              Lahat ng balita
              <span className="sr-only"> - View all news articles</span>
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {latestNews.map(news => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        </Container>
      </section>

      {/* Upcoming Events Section */}
      <section className="mb-16 bg-gray-50 py-12">
        <Container>
          <div className="flex justify-between items-baseline mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Mga Darating na Event</h2>
            <Link 
              to="/events"
              className="text-primary-600 hover:text-primary-700"
            >
              Lahat ng events
              <span className="sr-only"> - View all upcoming events</span>
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </Container>
      </section>

      {/* Services Section */}
      <section className="mb-16">
        <Container>
          <div className="flex justify-between items-baseline mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Mga Serbisyo</h2>
            <Link 
              to="/services"
              className="text-primary-600 hover:text-primary-700"
            >
              Lahat ng serbisyo
              <span className="sr-only"> - View all available services</span>
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  )
}

export default Home
