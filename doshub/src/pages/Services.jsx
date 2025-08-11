import { useState, useEffect } from 'react'
import Container from '../components/Container'
import ServiceCard from '../components/Card/ServiceCard'
import ServiceRequestModal from '../components/ServiceRequestModal'
import { servicesData } from '../data/sampleData'

/**
 * Services listing page with request modal
 * TODO: Replace with Firebase implementation:
 * - Import { collection, getDocs } from 'firebase/firestore'
 * - Create services collection reference
 * - Use getDocs or onSnapshot for real-time updates
 * - Add timestamp field for sorting
 */
function Services() {
  const [selectedService, setSelectedService] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    document.title = 'Mga Serbisyo | DosHub'
  }, [])

  // Handle service request
  const handleRequestService = (serviceId) => {
    const service = servicesData.find(s => s.id === serviceId)
    setSelectedService(service)
    setShowModal(true)
  }

  // Handle form submission success
  const handleRequestSuccess = () => {
    setShowModal(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 5000) // Hide success message after 5s
  }

  return (
    <Container>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Mga Serbisyo
        </h1>
        <p className="text-gray-600 mb-6">
          Mag-browse at humiling ng mga serbisyong pampubliko mula sa ating barangay.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {servicesData.map(service => (
          <div key={service.id} className="flex flex-col h-full">
            <ServiceCard 
              service={service}
              onRequest={() => handleRequestService(service.id)}
            />
          </div>
        ))}
      </div>

      {/* Service Request Modal */}
      {showModal && (
        <ServiceRequestModal
          service={selectedService}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSuccess={handleRequestSuccess}
        />
      )}

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-50 text-green-800 px-6 py-4 rounded-lg shadow-lg flex items-center animate-fade-in">
          <svg
            className="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <div>
            <p className="font-medium">Tagumpay!</p>
            <p className="text-sm">
              Natanggap na ang iyong kahilingan. Makakatanggap ka ng email para sa susunod na hakbang.
            </p>
          </div>
          <button
            onClick={() => setShowSuccess(false)}
            className="ml-4 text-green-700 hover:text-green-900"
            aria-label="Close notification"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Services Information */}
      <div className="mt-12 bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-4">
          Paano Humiling ng Serbisyo?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-xl font-bold text-primary-600">1</span>
            </div>
            <h3 className="font-semibold mb-2">Pumili ng Serbisyo</h3>
            <p className="text-gray-600">
              I-click ang "Request Service" sa serbisyong nais mong hingin.
            </p>
          </div>
          <div>
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-xl font-bold text-primary-600">2</span>
            </div>
            <h3 className="font-semibold mb-2">Punan ang Form</h3>
            <p className="text-gray-600">
              Ibigay ang kinakailangang impormasyon para sa iyong kahilingan.
            </p>
          </div>
          <div>
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-xl font-bold text-primary-600">3</span>
            </div>
            <h3 className="font-semibold mb-2">Maghintay ng Update</h3>
            <p className="text-gray-600">
              Makakatanggap ka ng email tungkol sa status ng iyong kahilingan.
            </p>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Services
