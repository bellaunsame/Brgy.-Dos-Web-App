import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { listenAuthState, createNews, updateNews } from '../../firebase/firebaseClient'

/**
 * News form for create/edit
 * TODO: Add image upload functionality using Firebase Storage
 */
function AdminNewsForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    imageUrl: '',
    author: ''
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

  // Load existing news data if editing
  useEffect(() => {
    if (id) {
      // TODO: Fetch existing news data
      // const fetchNews = async () => {
      //   const newsDoc = await getDoc(doc(db, 'news', id))
      //   if (newsDoc.exists()) {
      //     setFormData(newsDoc.data())
      //   }
      // }
      // fetchNews()
    }
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      if (id) {
        await updateNews(id, formData)
      } else {
        await createNews(formData)
      }
      navigate('/admin')
    } catch (err) {
      console.error('Error saving news:', err)
      setError('Error saving news. Please try again.')
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
                {id ? 'Edit News' : 'Create News'}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {id ? 'Update the news article details below.' : 'Fill in the news article details below.'}
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
                  Brief summary of the news article.
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
                  URL to the news article image. TODO: Add image upload functionality.
                </p>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                  Author
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="author"
                    id="author"
                    value={formData.author}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
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
              {isLoading ? 'Saving...' : id ? 'Update News' : 'Create News'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AdminNewsForm
