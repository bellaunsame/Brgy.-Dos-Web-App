import { Link } from 'react-router-dom'

/**
 * EventCard component to display event information
 * @param {Object} props
 * @param {Object} props.event - Event data
 * @param {string} props.event.id - Unique identifier
 * @param {string} props.event.title - Event title
 * @param {string} props.event.date - Event date
 * @param {string} props.event.venue - Event venue
 * @param {string} props.event.excerpt - Short description
 */
function EventCard({ event }) {
  const { id, title, date, venue = 'Barangay Hall', excerpt } = event
  const eventDate = new Date(date)
  
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
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start space-x-4">
        {/* Calendar Date Display */}
        <div className="flex-shrink-0 w-16 text-center">
          <div className="bg-primary-50 rounded-t-lg p-2">
            <span className="text-primary-700 text-sm font-semibold">
              {eventDate.toLocaleDateString('en-PH', { month: 'short' })}
            </span>
          </div>
          <div className="bg-white border border-primary-100 rounded-b-lg p-2">
            <span className="text-2xl font-bold text-gray-900">
              {eventDate.getDate()}
            </span>
          </div>
        </div>

        {/* Event Details */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            <Link to={`/events/${id}`} className="hover:text-primary-600">
              {title}
            </Link>
          </h3>
          
          <div className="space-y-2 mb-4">
            <p className="text-sm text-gray-600 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <time dateTime={date}>{formattedDate}, {formattedTime}</time>
            </p>
            
            <p className="text-sm text-gray-600 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {venue}
            </p>
          </div>

          <p className="text-gray-600 mb-4">{excerpt}</p>

          <Link
            to={`/events/${id}`}
            className="inline-flex items-center text-primary-600 hover:text-primary-700"
          >
            View Details
            <span className="sr-only"> about {title}</span>
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EventCard
