import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Container from '../components/Container'
import { eventsData } from '../data/sampleData'

/**
 * Event detail page with calendar integration
 * TODO: Replace with Firebase implementation:
 * - Import { doc, getDoc } from 'firebase/firestore'
 * - Create doc reference using useParams id
 * - Use getDoc to fetch single event
 * - Implement real-time updates with onSnapshot if needed
 */
function EventDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const event = eventsData.find(event => event.id === id)
  
  useEffect(() => {
    if (event) {
      document.title = `${event.title} | DosHub Events`
    } else {
      document.title = 'Event Not Found | DosHub'
    }
  }, [event])

  /**
   * Generates ICS file content for calendar integration
   * TODO: Implement full ICS generation with proper RFC 5545 compliance
   * Consider using a library like ics-js
   */
  const generateICS = (event) => {
    const startDate = new Date(event.date)
    const endDate = new Date(startDate.getTime() + (2 * 60 * 60 * 1000)) // Default 2 hour duration

    // Basic ICS format - replace with proper ICS library in production
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//DosHub//Events Calendar//EN',
      'BEGIN:VEVENT',
      `UID:${event.id}@doshub.ph`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:.]/g, '')}`,
      `DTSTART:${startDate.toISOString().replace(/[-:.]/g, '')}`,
      `DTEND:${endDate.toISOString().replace(/[-:.]/g, '')}`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.content}`,
      `LOCATION:${event.venue}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n')

    // Create and download file
    const blob = new Blob([icsContent], { type: 'text/calendar' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `${event.title.toLowerCase().replace(/\s+/g, '-')}.ics`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  if (!event) {
    return (
      <Container>
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold mb-4">Hindi Mahanap ang Event</h1>
          <p className="text-gray-600 mb-8">
            Ang hinahanap mong event ay hindi matagpuan o maaaring lumipas na.
          </p>
          <Link
            to="/events"
            className="text-primary-600 hover:text-primary-700"
          >
            ← Bumalik sa Mga Events
          </Link>
        </div>
      </Container>
    )
  }

  const eventDate = new Date(event.date)
  const formattedDate = eventDate.toLocaleDateString('en-PH', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  const formattedTime = eventDate.toLocaleTimeString('en-PH', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })

  return (
    <article>
      {/* Event Hero */}
      <div className="relative h-[40vh] min-h-[300px] bg-gray-100 -mt-8 mb-8">
        <img
          src={event.imageUrl}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Event Date Overlay */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-white">
          <div className="text-5xl font-bold mb-2">
            {eventDate.getDate()}
          </div>
          <div className="text-xl">
            {eventDate.toLocaleDateString('en-PH', { month: 'long' })}
          </div>
        </div>
      </div>

      <Container className="max-w-4xl">
        {/* Back Link */}
        <Link
          to="/events"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Bumalik sa Mga Events
        </Link>

        {/* Event Details */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            {event.title}
          </h1>

          {/* Event Meta */}
          <div className="grid md:grid-cols-2 gap-6 mb-8 p-6 bg-gray-50 rounded-lg">
            <div>
              <h2 className="font-semibold text-gray-900 mb-2">
                Kailan
              </h2>
              <div className="space-y-1">
                <p className="text-gray-600">{formattedDate}</p>
                <p className="text-gray-600">{formattedTime}</p>
              </div>
            </div>
            <div>
              <h2 className="font-semibold text-gray-900 mb-2">
                Saan
              </h2>
              <p className="text-gray-600">{event.venue}</p>
            </div>
          </div>

          {/* Event Description */}
          <div className="prose max-w-none mb-8">
            <p className="lead text-xl text-gray-600 mb-4">
              {event.excerpt}
            </p>
            <div className="text-gray-800">
              {event.content}
            </div>
          </div>

          {/* Add to Calendar Button */}
          <button
            onClick={() => generateICS(event)}
            className="w-full md:w-auto bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            <span className="flex items-center justify-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Add to Calendar
            </span>
          </button>
        </div>
      </Container>
    </article>
  )
}

export default EventDetail
