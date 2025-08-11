# DosHub

A community hub for Barangay Dos built with React, Firebase, and Tailwind CSS.

## Migration to Firestore

This guide explains migrating from static sample data to live Firestore data for DosHub.

### Overview

The migration removes dependencies on `sampleData.js` and replaces them with live Firestore queries. Key changes include:

- Home page previews fetch latest 3 items using `getNewsList()`
- News/Events lists use paginated Firestore queries 
- Detail pages use real-time `onSnapshot` listeners
- Loading states during data fetching
- Proper cleanup of Firestore subscriptions

### Implementation Steps

1. **Home Page Changes**
   - Remove imports from `sampleData.js`
   - Add loading states while data is fetching
   - Use `limit(3)` for preview sections
   - Handle errors with fallback UI

2. **List Pages**
   - Replace static arrays with paginated queries
   - Add infinite scroll or pagination
   - Show loading skeletons during initial load
   - Cache results to improve performance

3. **Detail Pages**
   - Use `onSnapshot` for real-time updates
   - Clean up listeners in useEffect
   - Show loading state until data arrives
   - Handle missing documents gracefully

### Code Examples

#### Example 1: Fetching a List

```jsx
function NewsList() {
  const [news, setNews] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchNews() {
      try {
        setIsLoading(true)
        // Get latest 10 news items, ordered by date
        const newsItems = await getNewsList({
          limit: 10,
          orderBy: 'date',
          direction: 'desc'
        })
        setNews(newsItems)
      } catch (err) {
        console.error('Error fetching news:', err)
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchNews()
  }, [])

  if (error) return <ErrorMessage message={error} />
  if (isLoading) return <LoadingSkeleton />

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {news.map(item => (
        <NewsCard key={item.id} news={item} />
      ))}
    </div>
  )
}
```

#### Example 2: Real-time Document Subscription

```jsx
function NewsDetail({ id }) {
  const [news, setNews] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(
      doc(db, 'news', id),
      (doc) => {
        if (doc.exists()) {
          setNews({ id: doc.id, ...doc.data() })
        } else {
          setNews(null)
        }
        setIsLoading(false)
      },
      (error) => {
        console.error('Error subscribing to news:', error)
        setIsLoading(false)
      }
    )

    // Cleanup subscription when component unmounts
    return () => unsubscribe()
  }, [id])

  if (isLoading) return <LoadingSkeleton />
  if (!news) return <NotFound />

  return (
    <article className="prose lg:prose-xl">
      <h1>{news.title}</h1>
      <time>{formatDate(news.date)}</time>
      <div>{news.content}</div>
    </article>
  )
}
```

### Best Practices

- Always clean up Firestore listeners in useEffect cleanup function
- Show loading states during data fetches
- Handle errors at component level with fallback UI
- Validate data shape coming from Firestore
- Cache frequently accessed data
- Use TypeScript for better type safety

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Create a Firebase project and add your config
4. Run `npm run dev` to start development server

## License

MIT
