import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { listenAuthState, signOutUser } from '../../firebase/firebaseClient'
import {
  getNewsList,
  getEventsList,
  getServicesList,
  deleteNews,
  deleteEvent,
  deleteService
} from '../../firebase/firebaseClient'

const TABS = {
  NEWS: 'news',
  EVENTS: 'events',
  SERVICES: 'services'
}

/**
 * Admin dashboard with CRUD operations for news, events, and services
 */
function AdminDashboard() {
  const [activeTab, setActiveTab] = useState(TABS.NEWS)
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const navigate = useNavigate()

  // Auth check
  useEffect(() => {
    const unsubscribe = listenAuthState((user) => {
      if (!user) {
        navigate('/admin/login')
      }
    })
    return () => unsubscribe()
  }, [navigate])

  // Load data based on active tab
  useEffect(() => {
    const loadItems = async () => {
      setIsLoading(true)
      setError('')
      try {
        let data
        switch (activeTab) {
          case TABS.NEWS:
            data = await getNewsList()
            break
          case TABS.EVENTS:
            data = await getEventsList()
            break
          case TABS.SERVICES:
            data = await getServicesList()
            break
          default:
            data = []
        }
        setItems(data)
      } catch (err) {
        console.error('Error loading items:', err)
        setError('Error loading items. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }
    loadItems()
  }, [activeTab])

  // Handle item deletion
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return
    }

    try {
      switch (activeTab) {
        case TABS.NEWS:
          await deleteNews(id)
          break
        case TABS.EVENTS:
          await deleteEvent(id)
          break
        case TABS.SERVICES:
          await deleteService(id)
          break
      }
      
      setItems(items.filter(item => item.id !== id))
      showToastMessage('Item deleted successfully')
    } catch (err) {
      console.error('Error deleting item:', err)
      showToastMessage('Error deleting item', 'error')
    }
  }

  const showToastMessage = (message, type = 'success') => {
    setToastMessage(message)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleSignOut = async () => {
    try {
      await signOutUser()
      navigate('/admin/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {Object.values(TABS).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  ${
                    activeTab === tab
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="mt-6">
          {/* Action Button */}
          <div className="mb-6">
            <Link
              to={`/admin/${activeTab}/new`}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Create New {activeTab.slice(0, -1)}
            </Link>
          </div>

          {/* Items List */}
          {isLoading ? (
            <div className="text-center py-12">
              <svg
                className="animate-spin h-10 w-10 text-primary-600 mx-auto"
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
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-600">{error}</div>
          ) : items.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No items found. Create a new one to get started.
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="truncate">
                          <h3 className="text-lg font-medium text-gray-900">
                            {item.title}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            {new Date(
                              item.date || item.createdAt?.toDate()
                            ).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="ml-4 flex-shrink-0 space-x-2">
                          <Link
                            to={`/admin/${activeTab}/${item.id}`}
                            className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>

      {/* Toast Message */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-50 text-green-800 px-6 py-4 rounded-lg shadow-lg animate-fade-in">
          {toastMessage}
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
