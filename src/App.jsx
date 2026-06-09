import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingButtons from './components/FloatingButtons'
import Home from './pages/Home'
import About from './pages/About'
import Programs from './pages/Programs'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Payment from './pages/Payment'
import Payments from './pages/Payments'
import './App.css'

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pay" element={<Payment />} />
          <Route path="/payments" element={<Payments />} />
        </Routes>
      </main>
      <Footer />
      <FloatingButtons />
    </Router>
  )
}

export default App
