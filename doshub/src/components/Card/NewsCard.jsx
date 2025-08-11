import { Link } from 'react-router-dom'

/**
 * NewsCard component to display news article previews
 * @param {Object} props
 * @param {Object} props.news - News article data
 * @param {string} props.news.id - Unique identifier
 * @param {string} props.news.title - Article title
 * @param {string} props.news.date - Publication date
 * @param {string} props.news.excerpt - Short description
 * @param {string} props.news.imageUrl - Image URL
 * @param {string} props.news.author - Author name
 */
function NewsCard({ news }) {
  const { id, title, date, excerpt, imageUrl, author } = news
  const formattedDate = new Date(date).toLocaleDateString('en-PH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={imageUrl}
          alt=""
          className="object-cover w-full h-48"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <time dateTime={date}>{formattedDate}</time>
          <span className="mx-2">&bull;</span>
          <span>{author}</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          <Link to={`/news/${id}`} className="hover:text-primary-600">
            {title}
          </Link>
        </h3>
        <p className="text-gray-600 mb-4">{excerpt}</p>
        <Link
          to={`/news/${id}`}
          className="inline-flex items-center text-primary-600 hover:text-primary-700"
        >
          Read more
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
    </article>
  )
}

export default NewsCard
