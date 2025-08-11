import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { listenAuthState, createEvent, updateEvent } from '../../firebase/firebaseClient'

/**
 * Events form for create/edit
 * TODO: Add image upload functionality using Firebase Storage
 */
function AdminEventsForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    venue: '',
    excerpt: '',
    content: '',
    imageUrl: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Auth check
  useEffect(() => {
    const unsubscribe = listenAuthState((user) => {
      if (!user) {
        navigate('/admin/login')
      }
    })
    return () => unsubscribe()
  }, [navigate])

  // Load existing event data if editing
  useEffect(() => {
    if (id) {
      // TODO: Fetch existing event data
      // const fetchEvent = async () => {
      //   const eventDoc = await getDoc(doc(db, 'events', id))
      //   if (eventDoc.exists()) {
      //     const data = eventDoc.data()
      //     // Split datetime into date and time
      //     const datetime = new Date(data.date)
      //     setFormData({
      //       ...data,
      //       date: datetime.toISOString().split('T')[0],
      //       time: datetime.toTimeString().split(' ')[0].slice(0, 5)
      //     })
      //   }
      // }
      // fetchEvent()
    }
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // Combine date and time
      const datetime = new Date(`${formData.date}T${formData.time}`)
      const eventData = {
        ...formData,
        date: datetime.toISOString()
      }

      if (id) {
        await updateEvent(id, eventData)
      } else {
        await createEvent(eventData)
      }
      navigate('/admin')
    } catch (err) {
      console.error('Error saving event:', err)
      setError('Error saving event. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-8 divide-y divide-gray-200">
          <div>
            <div>
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
                {id ? 'Edit Event' : 'Create Event'}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {id ? 'Update the event details below.' : 'Fill in the event details below.'}
              </p>
            </div>

            {error && (
              <div className="mt-4 bg-red-50 text-red-700 p-4 rounded-md">
                {error}
              </div>
            )}

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <div className="mt-1">
                  <input
                    type="date"
                    name="date"
                    id="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                  Time
                </label>
                <div className="mt-1">
                  <input
                    type="time"
                    name="time"
                    id="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="venue" className="block text-sm font-medium text-gray-700">
                  Venue
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="venue"
                    id="venue"
                    value={formData.venue}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
                  Excerpt
                </label>
                <div className="mt-1">
                  <textarea
                    id="excerpt"
                    name="excerpt"
                    rows={3}
                    value={formData.excerpt}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Brief description of the event.
                </p>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                  Content
                </label>
                <div className="mt-1">
                  <textarea
                    id="content"
                    name="content"
                    rows={10}
                    value={formData.content}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <div className="mt-1">
                  <input
                    type="url"
                    name="imageUrl"
                    id="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  URL to the event image. TODO: Add image upload functionality.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : id ? 'Update Event' : 'Create Event'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AdminEventsForm
