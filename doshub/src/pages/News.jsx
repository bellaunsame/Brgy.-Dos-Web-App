import { useState, useEffect } from 'react'
import Container from '../components/Container'
import NewsCard from '../components/Card/NewsCard'
import { newsData } from '../data/sampleData'

/**
 * News listing page with search and pagination
 * TODO: Replace with Firebase implementation:
 * - Import { collection, query, orderBy, getDocs } from 'firebase/firestore'
 * - Create news collection reference
 * - Use query with orderBy('date', 'desc')
 * - Implement real-time updates with onSnapshot
 */
function News() {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // Update document title
  useEffect(() => {
    document.title = 'Mga Balita | DosHub'
  }, [])

  // Filter news by search term
  const filteredNews = newsData.filter(news =>
    news.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Calculate pagination
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedNews = filteredNews.slice(startIndex, startIndex + itemsPerPage)

  // Handle page navigation
  const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1))
  const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages))

  return (
    <Container>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Mga Balita</h1>
        <p className="text-gray-600 mb-6">
          Manatiling updated sa mga pinakabagong balita at kaganapan sa ating komunidad.
        </p>

        {/* Search Input */}
        <div className="relative max-w-md">
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1) // Reset to first page on search
            }}
            placeholder="Maghanap ng balita..."
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            aria-label="Search news"
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* News Grid */}
      {paginatedNews.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {paginatedNews.map(news => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">
            Walang nahanap na balita para sa "{searchTerm}"
          </p>
        </div>
      )}

      {/* Pagination Controls */}
      {filteredNews.length > itemsPerPage && (
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-sm rounded-md ${
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-primary-600 hover:bg-primary-50'
            }`}
          >
            <span className="sr-only">Previous page of news</span>
            ← Nakaraan
          </button>
          
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 text-sm rounded-md ${
              currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-primary-600 hover:bg-primary-50'
            }`}
          >
            <span className="sr-only">Next page of news</span>
            Susunod →
          </button>
        </div>
      )}
    </Container>
  )
}

export default News
