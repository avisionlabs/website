import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Company from './pages/Company'
import Printers from './pages/products/Printers'
import Scanners from './pages/products/Scanners'
import ProductOverview from './pages/products/ProductOverview'
import Contact from './pages/Contact'
import Support from './pages/Support'

function App() {
  return (
    <>
      <Navbar />
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
      <Footer />
    </>
  )
}

export default App
