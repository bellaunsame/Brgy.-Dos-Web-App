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
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminLogin from './pages/admin/AdminLogin'
import AdminNewsForm from './pages/admin/AdminNewsForm'
import AdminEventsForm from './pages/admin/AdminEventsForm'
import AdminServicesForm from './pages/admin/AdminServicesForm'

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
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/news/new" element={<AdminNewsForm />} />
            <Route path="/admin/news/:id" element={<AdminNewsForm />} />
            <Route path="/admin/events/new" element={<AdminEventsForm />} />
            <Route path="/admin/events/:id" element={<AdminEventsForm />} />
            <Route path="/admin/services/new" element={<AdminServicesForm />} />
            <Route path="/admin/services/:id" element={<AdminServicesForm />} />
          </Routes>
        </Container>
      </main>

      <Footer />
    </div>
  )
}

export default App
