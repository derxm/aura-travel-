import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { Footer, Navbar } from './components/SiteChrome.jsx'
import { Home } from './pages/Home.jsx'
import { Discover } from './pages/Discover.jsx'
import { DestinationDetails, PropertyDetails } from './pages/Details.jsx'
import { Booking, MyTrips, SignIn } from './pages/Journeys.jsx'
import { useFavorites } from './hooks/useLocalData.js'
import './App.css'

function PageMotion({ children }) {
  const location = useLocation()
  return <AnimatePresence mode="wait"><motion.div key={location.pathname} className="page-shell" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>{children}</motion.div></AnimatePresence>
}

export default function App() {
  const { favorites, toggleFavorite } = useFavorites()
  const location = useLocation()
  return <MotionConfig reducedMotion="user"><>
    <Navbar />
    <PageMotion>
      <Routes location={location}>
        <Route path="/" element={<Home favorites={favorites} toggleFavorite={toggleFavorite} />} />
        <Route path="/discover" element={<Discover favorites={favorites} toggleFavorite={toggleFavorite} />} />
        <Route path="/destinations/:destinationId" element={<DestinationDetails favorites={favorites} toggleFavorite={toggleFavorite} />} />
        <Route path="/stays/:propertyId" element={<PropertyDetails />} />
        <Route path="/book/:propertyId" element={<Booking />} />
        <Route path="/my-trips" element={<MyTrips favorites={favorites} toggleFavorite={toggleFavorite} />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/register" element={<SignIn register />} />
        <Route path="*" element={<main className="not-found"><p className="eyebrow">AURA / 404</p><h1>This place is off the map.</h1><a className="text-link" href="/">Return to the beginning <span>↗</span></a></main>} />
      </Routes>
      {!location.pathname.startsWith('/book/') && <Footer />}
    </PageMotion>
  </></MotionConfig>
}