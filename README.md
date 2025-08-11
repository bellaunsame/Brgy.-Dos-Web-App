# DosHub - Barangay Community Platform

A modern web application for Barangay Dos to share news, events, and services with the community. Built with React, Firebase, and Tailwind CSS.

## 🚀 Features

- News and Updates
- Event Management
- Service Requests
- Community Information Hub

## 🛠️ Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS v4.1
- **Backend**: Firebase v9
  - Firestore for data
  - Authentication for admin access
  - Storage for images
- **Hosting**: Vercel
- **State Management**: React hooks + Context
- **Forms**: Custom validation
- **Routing**: React Router v6

## 📦 Local Development

### Prerequisites

- Node.js 18+ 
- npm 9+
- Git

### Setup Steps

1. Clone the repository
```bash
git clone https://github.com/yourusername/doshub.git
cd doshub
```

2. Install dependencies
```bash
npm install
```

3. Create `.env.local` file in project root:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start development server
```bash
npm run dev
```

Visit `http://localhost:5173`

## Firebase Setup

### Config Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication and Firestore
3. Copy config from Project Settings > General > Your Apps > Web App
4. Paste config values in `.env.local`

### Firestore Collections

Create the following collections:

```
news/
  - id: auto
  - title: string
  - content: string
  - excerpt: string
  - imageUrl: string
  - date: timestamp
  - author: string

events/
  - id: auto
  - title: string
  - description: string
  - date: timestamp
  - location: string
  - imageUrl: string
  
services/
  - id: auto
  - title: string
  - excerpt: string
  - content: string
  - requirements: array
  - imageUrl: string
```

### Sample Document

Example news document:
```json
{
  "title": "Barangay Clean-up Drive",
  "content": "Join us for our monthly community clean-up...",
  "excerpt": "Monthly community clean-up event",
  "imageUrl": "https://example.com/image.jpg",
  "date": "2025-08-11T09:00:00",
  "author": "Admin"
}
```

### Admin User Setup

1. Go to Firebase Console > Authentication
2. Click "Add User"
3. Enter email and strong password
4. Note credentials (store securely)
5. Optional: Enable Multi-Factor Authentication

## Deployment

### Vercel Setup

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables:
   ```
   VITE_FIREBASE_API_KEY=xxx
   VITE_FIREBASE_AUTH_DOMAIN=xxx
   VITE_FIREBASE_PROJECT_ID=xxx
   VITE_FIREBASE_STORAGE_BUCKET=xxx
   VITE_FIREBASE_MESSAGING_SENDER_ID=xxx
   VITE_FIREBASE_APP_ID=xxx
   ```
4. Deploy

### vercel.json
```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

## Development Guidelines

### Git Workflow

1. Create feature branch
```bash
git checkout -b feature/add-news-pagination
```

2. Make changes and commit using conventional commits:
```bash
git commit -m "feat: add pagination to news list"
git commit -m "fix: correct news card date format"
git commit -m "docs: update API documentation"
git commit -m "style: adjust card spacing"
git commit -m "refactor: extract pagination logic"
git commit -m "test: add news list tests"
```

3. Push and create PR
```bash
git push origin feature/add-news-pagination
```

### Branch Strategy

- `main`: Production-ready code
- `develop`: Integration branch
- `feature/*`: New features
- `fix/*`: Bug fixes
- `docs/*`: Documentation updates
- `refactor/*`: Code improvements

### Commit Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting/styling
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

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
=======
# Brgy.-Dos-Web-App
A modern web application for Barangay Dos to share news, events, and services with the community. Built with React, Firebase, and Tailwind CSS.
>>>>>>> ff0c868835684c0bc1156c487301c15a1e0cdf0d
