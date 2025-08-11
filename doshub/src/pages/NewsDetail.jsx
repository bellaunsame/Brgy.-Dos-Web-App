import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Container from '../components/Container'
import { newsData } from '../data/sampleData'

/**
 * News detail page showing full article content
 * TODO: Replace with Firebase implementation:
 * - Import { doc, getDoc } from 'firebase/firestore'
 * - Create doc reference using useParams id
 * - Use getDoc to fetch single article
 * - Implement real-time updates with onSnapshot if needed
 */
function NewsDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  // Find news article by id
  const article = newsData.find(news => news.id === id)
  
  // Update document title and handle 404
  useEffect(() => {
    if (article) {
      document.title = `${article.title} | DosHub`
    } else {
      document.title = 'Article Not Found | DosHub'
      // Optionally redirect to news listing on 404
      // navigate('/news')
    }
  }, [article, navigate])

  if (!article) {
    return (
      <Container>
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold mb-4">Hindi Mahanap ang Balita</h1>
          <p className="text-gray-600 mb-8">
            Ang hinahanap mong balita ay hindi matagpuan o maaaring natanggal na.
          </p>
          <Link
            to="/news"
            className="text-primary-600 hover:text-primary-700"
          >
            ← Bumalik sa Mga Balita
          </Link>
        </div>
      </Container>
    )
  }

  const formattedDate = new Date(article.date).toLocaleDateString('en-PH', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <article>
      {/* Hero Image */}
      <div className="relative h-[40vh] min-h-[300px] bg-gray-100 -mt-8 mb-8">
        <img
          src={article.imageUrl}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      <Container className="max-w-4xl">
        {/* Back Link */}
        <Link
          to="/news"
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
          Bumalik sa Mga Balita
        </Link>

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {article.title}
          </h1>
          <div className="flex items-center text-gray-600 space-x-4">
            <time dateTime={article.date}>{formattedDate}</time>
            <span>&bull;</span>
            <span>By {article.author}</span>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          {/* If using markdown content, use a markdown renderer here */}
          <p className="lead text-xl text-gray-600 mb-8">
            {article.excerpt}
          </p>
          <div className="text-gray-800 leading-relaxed space-y-6">
            {article.content}
          </div>
        </div>

        {/* Share Links (Optional) */}
        <div className="border-t border-gray-200 mt-12 pt-6">
          <h2 className="text-sm font-semibold text-gray-600 mb-4">
            Share this article
          </h2>
          <div className="flex space-x-4">
            {/* Add social share buttons here */}
            <button
              type="button"
              className="text-gray-600 hover:text-primary-600"
              aria-label="Share on Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/>
              </svg>
            </button>
            <button
              type="button"
              className="text-gray-600 hover:text-primary-600"
              aria-label="Share on Twitter"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.95,4.57a10,10,0,0,1-2.82.77,4.96,4.96,0,0,0,2.16-2.72,9.9,9.9,0,0,1-3.12,1.19,4.92,4.92,0,0,0-8.39,4.49A14,14,0,0,1,1.64,3.16,4.92,4.92,0,0,0,3.19,9.72a4.86,4.86,0,0,1-2.23-.61v.06A4.92,4.92,0,0,0,4.94,14a5,5,0,0,1-2.21.08,4.93,4.93,0,0,0,4.6,3.42,9.85,9.85,0,0,1-7.29,2A14,14,0,0,0,7.53,21c9.14,0,14.12-7.58,14.12-14.12q0-.32-.01-.64A10.1,10.1,0,0,0,24,3.78"/>
              </svg>
            </button>
          </div>
        </div>
      </Container>
    </article>
  )
}

export default NewsDetail
