import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowRight, ArrowUpRight, Compass, Flower2, Mail, Sparkles } from 'lucide-react'
import { BookingSearch } from '../components/BookingSearch.jsx'
import { DestinationCard, PropertyCard } from '../components/Cards.jsx'
import { destinations, destinationImage, experiences, imageUrl, properties } from '../data.js'

function Newsletter() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const submit = (event) => {
    event.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setSuccess(false); setMessage('Enter a valid email address to continue.'); return }
    setSuccess(true)
    setMessage('Thank you. This demo is not connected to a mailing service.')
    setEmail('')
  }
  return <section className="newsletter section-pad" id="newsletter"><div className="newsletter-copy"><p className="eyebrow">A NOTE FROM AURA</p><h2>A little inspiration<br />for your next escape.</h2><p>Remarkable places, thoughtful travel ideas, and stories worth exploring.</p></div><form className="newsletter-form" onSubmit={submit}><label className="sr-only" htmlFor="newsletter-email">Email address</label><div className="newsletter-input"><Mail size={17} /><input id="newsletter-email" type="email" placeholder="Your email address" value={email} onChange={(event) => setEmail(event.target.value)} required /></div><button className="button button-gold" type="submit">Subscribe <ArrowRight size={15} /></button>{message && <p className={success ? 'form-message' : 'form-message error'} role="status">{message}</p>}</form></section>
}

export function Home({ favorites, toggleFavorite }) {
  const selectedDestinations = [destinations[0], destinations[1], destinations[2], destinations[3], destinations[5]]
  return <main>
    <section className="hero" style={{ '--hero-image': `url("${imageUrl('photo-1518548419970-58e3b4079ab2', 2200)}")` }}>
      <div className="hero-shade" />
      <motion.div className="hero-copy" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.13 } } }}>
        <motion.p className="eyebrow hero-eyebrow" variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>Exceptional places. Extraordinary moments.</motion.p>
        <motion.h1 variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}>Find your<br /><em>extraordinary.</em></motion.h1>
        <motion.p className="hero-intro" variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>Discover extraordinary destinations, remarkable stays, and experiences that stay with you long after the journey ends.</motion.p>
        <motion.div className="hero-actions" variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}><Link className="button button-gold" to="/discover">Explore destinations <ArrowUpRight size={16} /></Link><a className="button button-quiet" href="#story">Discover our story <ArrowRight size={15} /></a></motion.div>
      </motion.div>
      <div className="hero-meta"><span>03° 50' 17.4" S&nbsp; / &nbsp;115° 12' 45.2" E</span><a href="#intro">Scroll to explore <span className="scroll-line" /></a></div>
      <div className="hero-index"><span>01</span><span className="index-rule" /><span>06</span></div>
    </section>
    <div className="search-wrap"><BookingSearch /></div>

    <section className="intro section-pad" id="intro"><div className="intro-label"><p className="eyebrow">The world, considered differently</p><span className="section-number">01 / 04</span></div><div className="intro-grid"><div className="intro-copy"><h2>Some places change<br />the way you <em>see the world.</em></h2><p>From secluded coastal escapes to culturally rich cities, discover destinations selected for the moments they make possible.</p><Link to="/discover" className="text-link">Discover the AURA experience <ArrowUpRight size={16} /></Link></div><div className="intro-image"><img src={destinationImage(destinations[2], 1200)} alt="A Kyoto pagoda seen through spring foliage" loading="lazy" /><span>Kyoto, Japan <i>35° 00' N / 135° 46' E</i></span></div></div></section>

    <section className="destinations-section section-pad" id="destinations"><div className="section-heading"><div><p className="eyebrow">Curated for the curious</p><h2>Places worth getting<br />lost <em>in.</em></h2></div><Link to="/discover" className="round-link" aria-label="Explore all destinations"><ArrowUpRight size={21} /></Link></div><div className="destination-grid">{selectedDestinations.map((destination, index) => <DestinationCard key={destination.id} destination={destination} favorites={favorites} toggleFavorite={toggleFavorite} className={`destination-tile-${index + 1}`} />)}</div></section>

    <section className="stays-section section-pad" id="stays"><div className="section-heading"><div><p className="eyebrow">Stays that stay with you</p><h2>Beyond the <em>expected.</em></h2></div><Link to="/discover?type=stays" className="text-link">View all stays <ArrowRight size={15} /></Link></div><div className="property-grid">{properties.slice(0, 3).map((property) => <PropertyCard key={property.id} property={property} favorites={favorites} toggleFavorite={toggleFavorite} />)}</div><p className="demo-note">Sample listings for demonstration. Prices and ratings are illustrative and availability is not live.</p></section>

    <section className="manifesto section-pad" id="story"><div className="manifesto-top"><p className="eyebrow">The AURA experience</p><span className="manifesto-mark">A.</span></div><div className="manifesto-main"><h2>Travel is more than<br />where you <em>go.</em></h2><p>It's the stillness of a hidden retreat, the energy of an unfamiliar city, and the moments that become part of your story.</p></div><div className="pillars"><article><Compass /><span>01</span><h3>Thoughtfully curated</h3><p>Remarkable places selected for their character, atmosphere, and sense of place.</p></article><article><Sparkles /><span>02</span><h3>Experiences that matter</h3><p>Meaningful ways to experience local culture, nature, food, and adventure.</p></article><article><Flower2 /><span>03</span><h3>Your journey, your way</h3><p>Stays and experiences that match the journey you want to create.</p></article></div></section>

    <section className="experiences-section section-pad" id="experiences"><div className="section-heading"><div><p className="eyebrow">Make room for the unexpected</p><h2>Go beyond <em>the stay.</em></h2></div><p className="section-side-copy">Follow what moves you. The best moments rarely fit an itinerary.</p></div><div className="experience-grid">{experiences.map((experience) => <Link to={`/discover?destination=${experience.destinationId}`} className="experience-card" key={experience.title}><img src={imageUrl(experience.image, 800)} alt="" loading="lazy" /><div><span>{experience.title}</span><strong>{experience.place}</strong><ArrowUpRight size={18} /></div></Link>)}</div></section>

    <section className="campaign" style={{ '--campaign-image': `url("${imageUrl('photo-1500530855697-b586d89ba3ee', 2200)}")` }}><div className="campaign-overlay" /><div className="campaign-copy"><p className="eyebrow">A different point of view</p><h2>The art of<br />going further.</h2><p>Find a slower rhythm, discover a different perspective, and make room for the unexpected.</p><Link to="/discover" className="button button-gold">Find your next escape <ArrowUpRight size={16} /></Link></div><span className="campaign-caption">AURA JOURNAL · ISSUE NO. 01</span></section>

    <Newsletter />
  </main>
}