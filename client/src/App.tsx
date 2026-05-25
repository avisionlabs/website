import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Company from './pages/Company/About'
import Printers from './pages/Products/Printers'
import Scanners from './pages/Products/Scanners'
import ProductOverview from './pages/Products/ProductOverview'
import Contact from './pages/Contact/Contact'
import Support from './pages/Support/Support'

function App() {
  const location = useLocation()
  return (
    <>
      <Navbar />
      <div key={location.key} className="animate-fade-slide-up">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/company/*" element={<Company />} />
          <Route path="/printers/:model" element={<ProductOverview />} />
          <Route path="/printers/*" element={<Printers />} />
          <Route path="/scanners/:model" element={<ProductOverview />} />
          <Route path="/scanners/*" element={<Scanners />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
