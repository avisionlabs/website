import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Company from './pages/Company'
import Products from './pages/Products'
import Contact from './pages/Contact'
import Support from './pages/Support'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/company/*" element={<Company />} />
        <Route path="/products/*" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/support" element={<Support />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
