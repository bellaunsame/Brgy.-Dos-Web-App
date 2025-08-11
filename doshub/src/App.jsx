import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import News from './pages/News'
import Events from './pages/Events'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Admin from './pages/Admin'

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/events" element={<Events />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  )
}

export default App
