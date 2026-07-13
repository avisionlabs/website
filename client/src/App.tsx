import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const Home = lazy(() => import('./pages/Home'))
const Company = lazy(() => import('./pages/Company/About'))
const Printers = lazy(() => import('./pages/Products/Printers'))
const Scanners = lazy(() => import('./pages/Products/Scanners'))
const ProductOverview = lazy(() => import('./pages/Products/ProductOverview'))
const Contact = lazy(() => import('./pages/Contact/Contact'))
const Support = lazy(() => import('./pages/Support/Support'))
const Sustainability = lazy(() => import('./pages/Company/Sustainability'))
const Admin = lazy(() => import('./pages/Admin/Admin'))

function App() {
  const location = useLocation()
  return (
    <>
      <Navbar />
      <Suspense fallback={null}>
        <div key={location.pathname} className="animate-fade-slide-up">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/company/*" element={<Company />} />
            <Route path="/printers/:model" element={<ProductOverview />} />
            <Route path="/printers/*" element={<Printers />} />
            <Route path="/scanners/:model" element={<ProductOverview />} />
            <Route path="/scanners/*" element={<Scanners />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/sustainability" element={<Sustainability />} />
            <Route path="/adminpage" element={<Admin />} />
            <Route path="/support" element={<Support />} />
          </Routes>
        </div>
        <Footer />
      </Suspense>
      <Analytics />
    </>
  )
}

export default App
