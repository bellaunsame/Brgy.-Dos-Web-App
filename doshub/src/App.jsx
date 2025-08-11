import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Container from './components/Container'
import Home from './pages/Home'
import News from './pages/News'
import NewsDetail from './pages/NewsDetail'
import Events from './pages/Events'
import EventDetail from './pages/EventDetail'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Admin from './pages/Admin'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Container className="py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Container>
      </main>

      <Footer />
    </div>
  )
}

export default App
