import { useState, useEffect } from 'react'
import Container from '../components/Container'
import EventCard from '../components/Card/EventCard'
import { eventsData } from '../data/sampleData'

/**
 * Events listing page with month filtering
 * TODO: Replace with Firebase implementation:
 * - Import { collection, query, where, orderBy } from 'firebase/firestore'
 * - Create events collection reference
 * - Query with:
 *   - where('date', '>=', startOfMonth)
 *   - where('date', '<=', endOfMonth)
 *   - orderBy('date', 'asc')
 * - Use onSnapshot for real-time updates
 */
function Events() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  useEffect(() => {
    document.title = 'Mga Kaganapan | DosHub'
  }, [])

  // Get all available months from events for the filter
  const months = Array.from(new Set(eventsData.map(event => {
    const date = new Date(event.date)
    return date.getMonth()
  }))).sort((a, b) => a - b)

  // Filter events by selected month
  const filteredEvents = eventsData.filter(event => {
    const eventDate = new Date(event.date)
    return eventDate.getMonth() === selectedMonth &&
           eventDate.getFullYear() === selectedYear &&
           eventDate >= new Date() // Only show upcoming events
  }).sort((a, b) => new Date(a.date) - new Date(b.date))

  const monthNames = [
    'Enero', 'Pebrero', 'Marso', 'Abril', 'Mayo', 'Hunyo',
    'Hulyo', 'Agosto', 'Setyembre', 'Oktubre', 'Nobyembre', 'Disyembre'
  ]

  return (
    <Container>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Mga Kaganapan
        </h1>
        <p className="text-gray-600 mb-6">
          Manatiling updated sa mga darating na kaganapan sa ating komunidad.
        </p>

        {/* Month Filter */}
        <div className="flex items-center space-x-4 mb-8">
          <label htmlFor="month-filter" className="text-gray-700 font-medium">
            Pumili ng buwan:
          </label>
          <select
            id="month-filter"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {monthNames[month]} {selectedYear}
              </option>
            ))}
          </select>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600">
              Walang nakitang kaganapan para sa {monthNames[selectedMonth]}.
            </p>
            <button
              onClick={() => setSelectedMonth(new Date().getMonth())}
              className="mt-4 text-primary-600 hover:text-primary-700"
            >
              Tingnan ang mga kaganapan sa kasalukuyang buwan →
            </button>
          </div>
        )}

        {/* Calendar Integration Notice */}
        <div className="mt-12 bg-primary-50 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-primary-900 mb-2">
            📅 I-save ang mga Event sa Iyong Calendar
          </h2>
          <p className="text-primary-800">
            Maaari mong i-click ang "Add to Calendar" button sa bawat event 
            para automatic itong mai-save sa iyong personal calendar.
          </p>
        </div>
      </div>
    </Container>
  )
}

export default Events
