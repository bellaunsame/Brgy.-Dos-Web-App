import { useState, useEffect } from 'react'
import Container from '../components/Container'

/**
 * Contact page with form and map
 * TODO: Replace with Firebase implementation:
 * - Import { addDoc, collection } from 'firebase/firestore'
 * - Create messages collection
 * - Add serverTimestamp()
 * - Optional: Setup Firebase Function email trigger
 */
function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    document.title = 'Makipag-ugnayan | DosHub'
  }, [])

  // Validate form fields
  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Kinakailangan ang pangalan'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Kinakailangan ang email'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Hindi wastong format ng email'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Kinakailangan ang mensahe'
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
      // const messagesRef = collection(db, 'messages')
      // await addDoc(messagesRef, {
      //   ...formData,
      //   createdAt: serverTimestamp()
      // })
      
      // TODO: Optional - Send email notification
      // const sendEmail = httpsCallable(functions, 'sendContactEmail')
      // await sendEmail({ ...formData })

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setShowSuccess(true)
      setFormData({
        name: '',
        email: '',
        message: ''
      })
    } catch (error) {
      console.error('Error sending message:', error)
      setErrors(prev => ({
        ...prev,
        submit: 'May error sa pagsumite. Pakisubukan muli.'
      }))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Container>
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            Makipag-ugnayan
          </h1>
          <p className="text-gray-600 mb-8">
            May katanungan o suhestyon? Mag-iwan ng mensahe at kami ay makikipag-ugnayan sa inyo.
          </p>

          <div className="space-y-6 mb-8">
            {/* Address */}
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-1">Address</h2>
                <address className="not-italic text-gray-600">
                  Barangay Hall, Barangay Dos<br />
                  123 Main Street<br />
                  City, Province 1234
                </address>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-1">Telepono</h2>
                <p className="text-gray-600">
                  <a href="tel:+639123456789" className="hover:text-primary-600">
                    +63 912 345 6789
                  </a>
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-1">Email</h2>
                <p className="text-gray-600">
                  <a href="mailto:info@doshub.ph" className="hover:text-primary-600">
                    info@doshub.ph
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
            {/* TODO: Replace with actual Google Maps embed URL */}
            {/* Format: https://www.google.com/maps/embed?pb=... */}
            <iframe
              src="about:blank"
              className="w-full h-full"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Barangay Dos Location Map"
            />
          </div>
        </div>

        {/* Contact Form */}
        <div>
          {showSuccess ? (
            <div className="bg-green-50 text-green-800 rounded-lg p-6 animate-fade-in">
              <h2 className="text-2xl font-bold mb-4">Salamat sa iyong mensahe!</h2>
              <p className="mb-4">
                Natanggap na namin ang iyong mensahe. Kami ay makikipag-ugnayan sa 
                inyo sa lalong madaling panahon.
              </p>
              <button
                onClick={() => setShowSuccess(false)}
                className="text-green-700 hover:text-green-900 font-medium"
              >
                Magpadala ng panibagong mensahe →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Name field */}
              <div>
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

              {/* Email field */}
              <div>
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

              {/* Message field */}
              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                  Mensahe
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ilagay ang iyong mensahe dito..."
                  required
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                )}
              </div>

              {/* Submit button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                      Ipinapadala...
                    </span>
                  ) : (
                    'Ipadala ang Mensahe'
                  )}
                </button>

                {errors.submit && (
                  <p className="mt-2 text-sm text-red-600 text-center">
                    {errors.submit}
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </Container>
  )
}

export default Contact
