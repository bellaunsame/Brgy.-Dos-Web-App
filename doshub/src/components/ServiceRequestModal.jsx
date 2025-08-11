import { useState } from 'react'
import { createPortal } from 'react-dom'

/**
 * Service Request Modal Component
 * @param {Object} props
 * @param {Object} props.service - Service being requested
 * @param {boolean} props.isOpen - Modal visibility state
 * @param {Function} props.onClose - Close modal callback
 * @param {Function} props.onSuccess - Success callback after form submission
 * 
 * TODO: Replace with Firebase implementation:
 * - Import { addDoc, collection } from 'firebase/firestore'
 * - Create requests collection reference
 * - Use addDoc to save request
 * - Optionally send email notification using Firebase Functions
 */
function ServiceRequestModal({ service, isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    email: '',
    details: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form validation
  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Kinakailangan ang pangalan'
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Kinakailangan ang numero ng telepono'
    } else if (!/^(\+63|0)[0-9]{10}$/.test(formData.contactNumber.trim())) {
      newErrors.contactNumber = 'Hindi wastong format ng numero'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Kinakailangan ang email'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Hindi wastong format ng email'
    }

    if (!formData.details.trim()) {
      newErrors.details = 'Kinakailangan ang detalye'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // TODO: Replace with actual Firebase implementation
      // const requestsRef = collection(db, 'requests')
      // await addDoc(requestsRef, {
      //   serviceId: service.id,
      //   serviceName: service.title,
      //   ...formData,
      //   status: 'pending',
      //   createdAt: serverTimestamp()
      // })

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      onSuccess()
      // Reset form
      setFormData({
        name: '',
        contactNumber: '',
        email: '',
        details: ''
      })
    } catch (error) {
      console.error('Error submitting request:', error)
      setErrors(prev => ({
        ...prev,
        submit: 'May error sa pagsumite. Pakisubukan muli.'
      }))
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-lg max-w-xl w-full p-6 md:p-8">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Modal content */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">
              Request {service.title}
            </h2>
            <p className="text-gray-600">
              Punan ang form sa ibaba para sa iyong kahilingan.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Name field */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Buong Pangalan
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Juan dela Cruz"
                required
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Contact number field */}
            <div className="mb-4">
              <label htmlFor="contactNumber" className="block text-gray-700 font-medium mb-2">
                Numero ng Telepono
              </label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                  errors.contactNumber ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="09123456789"
                required
              />
              {errors.contactNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.contactNumber}</p>
              )}
            </div>

            {/* Email field */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="juan@example.com"
                required
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Details field */}
            <div className="mb-6">
              <label htmlFor="details" className="block text-gray-700 font-medium mb-2">
                Mga Detalye ng Kahilingan
              </label>
              <textarea
                id="details"
                name="details"
                value={formData.details}
                onChange={handleChange}
                rows={4}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                  errors.details ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ilarawan ang iyong kahilingan..."
                required
              />
              {errors.details && (
                <p className="mt-1 text-sm text-red-600">{errors.details}</p>
              )}
            </div>

            {/* Submit button */}
            <div className="flex items-center justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-gray-600 hover:text-gray-800"
              >
                Kanselahin
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Isinusumite...
                  </span>
                ) : (
                  'Isumite ang Kahilingan'
                )}
              </button>
            </div>

            {/* Submit error message */}
            {errors.submit && (
              <p className="mt-4 text-sm text-red-600 text-center">
                {errors.submit}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default ServiceRequestModal
