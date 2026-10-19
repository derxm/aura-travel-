import { useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, ChevronRight, MapPin, Plane } from 'lucide-react'
import { destinations, destinationImage, properties, propertyImage } from '../data.js'
import { PropertyCard } from '../components/Cards.jsx'
import { useBookings } from '../hooks/useLocalData.js'
import { formatNaira } from '../utils/currency.js'

const TODAY_DATE = new Date()
const TODAY = TODAY_DATE.toISOString().slice(0, 10)
const futureDate = (days) => { const date = new Date(TODAY_DATE); date.setDate(date.getDate() + days); return date.toISOString().slice(0, 10) }
const nightsBetween = (start, end) => Math.max(0, (new Date(end) - new Date(start)) / 86400000)

export function Booking() {
  const { propertyId } = useParams()
  const property = properties.find((item) => item.id === propertyId)
  const destination = destinations.find((item) => item.id === property?.destinationId)
  const [params] = useSearchParams()
  const { bookings, setBookings } = useBookings()
  const [step, setStep] = useState(0)
  const [checkin, setCheckin] = useState(params.get('checkin') || '')
  const [checkout, setCheckout] = useState(params.get('checkout') || '')
  const [guests, setGuests] = useState(Number(params.get('guests') || 2))
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [reference, setReference] = useState('')
  if (!property) return <div className="not-found"><h1>Stay not found.</h1><Link to="/discover">Back to discovery</Link></div>
  const nights = nightsBetween(checkin, checkout)
  const subtotal = property.price * nights
  const fees = Math.round(subtotal * 0.12)
  const total = subtotal + fees
  const next = (event) => {
    event.preventDefault()
    if (step === 0 && (!checkin || !checkout || nights < 1 || guests < 1)) return setError('Choose an arrival, departure, and at least one guest.')
    if (step === 1 && (!name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) return setError('Enter your name and a valid email address.')
    setError('')
    setStep(step + 1)
  }
  const confirm = () => {
    const code = `AU-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
    const booking = { id: code, propertyId, checkin, checkout, guests, name, email, phone, nights, total, status: 'upcoming', createdAt: new Date().toISOString() }
    setBookings([...bookings, booking]); setReference(code); setStep(3)
  }
  return <main className="booking-page"><div className="booking-top"><Link to={`/stays/${property.id}`}><ArrowLeft size={15} /> Back to stay</Link><p className="eyebrow">AURA / YOUR JOURNEY</p></div>
    <div className="booking-progress">{['Trip details', 'Your details', 'Review', 'Confirmed'].map((label, index) => <div className={step === index ? 'active' : step > index ? 'complete' : ''} key={label}><span>{step > index ? <Check size={14} /> : `0${index + 1}`}</span>{label}</div>)}</div>
    <div className="booking-content"><section className="booking-form-column">
      {step === 0 && <form onSubmit={next} className="flow-form"><p className="eyebrow">Step 01 / Trip details</p><h1>Make it <em>yours.</em></h1><p className="form-intro">Your journey begins with a few details.</p><div className="booking-property"><img src={propertyImage(property, 500)} alt="" /><div><span>{destination.name}, {destination.country}</span><strong>{property.name}</strong><span>{property.category}</span></div></div><div className="booking-input-grid"><label>Check in<input type="date" min={futureDate(0)} value={checkin} onChange={(event) => setCheckin(event.target.value)} required /></label><label>Check out<input type="date" min={checkin || futureDate(0)} value={checkout} onChange={(event) => setCheckout(event.target.value)} required /></label><label>Guests<select value={guests} onChange={(event) => setGuests(Number(event.target.value))}>{Array.from({ length: property.guests }, (_, index) => <option key={index + 1} value={index + 1}>{index + 1} {index ? 'guests' : 'guest'}</option>)}</select></label></div><button className="button button-gold" type="submit">Continue to your details <ArrowRight size={15} /></button>{error && <p className="form-message error" role="alert">{error}</p>}</form>}
      {step === 1 && <form onSubmit={next} className="flow-form"><p className="eyebrow">Step 02 / Guest information</p><h1>A name for the <em>journey.</em></h1><p className="form-intro">Your details are used for this local demonstration only.</p><label>Full name<input autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} required /></label><label>Email address<input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label><label>Phone number <span className="optional">Optional</span><input type="tel" autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} /></label><div className="step-actions"><button className="button button-outline" type="button" onClick={() => setStep(0)}>Back</button><button className="button button-gold" type="submit">Review your stay <ArrowRight size={15} /></button></div>{error && <p className="form-message error" role="alert">{error}</p>}</form>}
      {step === 2 && <div className="flow-form"><p className="eyebrow">Step 03 / Review</p><h1>Just as you <em>imagined.</em></h1><p className="form-intro">Check the details of your demonstration reservation.</p><div className="review-list"><p><span>Stay</span><strong>{property.name} · {destination.name}</strong></p><p><span>Dates</span><strong>{checkin} → {checkout}</strong></p><p><span>Guests</span><strong>{guests} {guests === 1 ? 'guest' : 'guests'}</strong></p><p><span>Guest</span><strong>{name} · {email}</strong></p><p><span>{nights} nights × {formatNaira(property.price)}</span><strong>{formatNaira(subtotal)}</strong></p><p><span>Demonstration taxes and fees</span><strong>{formatNaira(fees)}</strong></p><p className="review-total"><span>Estimated total</span><strong>{formatNaira(total)}</strong></p></div><p className="demo-note">This is a demonstration booking only. No payment will be taken and availability is not confirmed.</p><div className="step-actions"><button className="button button-outline" onClick={() => setStep(1)}>Back</button><button className="button button-gold" onClick={confirm}>Confirm demo booking <ArrowRight size={15} /></button></div></div>}
      {step === 3 && <div className="confirmation"><span className="confirmation-check"><Check /></span><p className="eyebrow">Step 04 / Confirmed</p><h1>Your journey<br />is <em>imagined.</em></h1><p>Your demonstration reservation for {property.name} has been saved to this browser.</p><div className="reference-box"><span>DEMO REFERENCE</span><strong>{reference}</strong></div><div className="confirm-summary"><span>{destination.name}, {destination.country}</span><strong>{checkin} — {checkout}</strong><span>{guests} guests · {formatNaira(total)} estimated</span></div><Link className="button button-gold" to="/my-trips">View my trips <ArrowRight size={15} /></Link></div>}
    </section><aside className="booking-aside"><img src={propertyImage(property, 800)} alt={`${property.name} property`} /><p className="eyebrow">Your considered stay</p><h2>{property.name}</h2><p><MapPin size={14} /> {destination.name}, {destination.country}</p><div className="aside-price"><span>{formatNaira(property.price)} / night</span><span>Sample rate</span></div>{nights > 0 && <div className="aside-total"><span>Estimated total</span><strong>{formatNaira(total)}</strong><small>{nights} nights · includes illustrative fees</small></div>}<p className="demo-note">Fictional listing. No real booking or payment.</p></aside></div>
  </main>
}

export function MyTrips({ favorites, toggleFavorite }) {
  const { bookings, setBookings } = useBookings()
  const [tab, setTab] = useState('upcoming')
  const now = TODAY
  const upcoming = bookings.filter((booking) => booking.checkout >= now && booking.status === 'upcoming')
  const past = bookings.filter((booking) => booking.checkout < now || booking.status === 'cancelled')
  const shown = tab === 'upcoming' ? upcoming : past
  const saved = properties.filter((property) => favorites.includes(property.id))
  const savedDestinations = destinations.filter((destination) => favorites.includes(destination.id))
  const cancel = (booking) => { if (window.confirm('Cancel this demonstration booking?')) setBookings(bookings.map((item) => item.id === booking.id ? { ...item, status: 'cancelled' } : item)) }
  return <main className="trips-page"><div className="trips-heading"><p className="eyebrow">Your AURA / Private travel journal</p><h1>Journeys, <em>gathered.</em></h1><p>Your saved places and demonstration reservations, all in one place.</p></div><div className="trips-tabs" role="tablist"><button role="tab" aria-selected={tab === 'upcoming'} className={tab === 'upcoming' ? 'selected' : ''} onClick={() => setTab('upcoming')}>Upcoming <span>{upcoming.length}</span></button><button role="tab" aria-selected={tab === 'past'} className={tab === 'past' ? 'selected' : ''} onClick={() => setTab('past')}>Past & cancelled <span>{past.length}</span></button></div>
    {shown.length ? <div className="trip-list">{shown.map((booking) => { const property = properties.find((item) => item.id === booking.propertyId); const destination = destinations.find((item) => item.id === property?.destinationId); return <article className="trip-item" key={booking.id}><img src={propertyImage(property, 700)} alt={`${property.name} property`} /><div className="trip-item-info"><p className="eyebrow">{booking.status === 'cancelled' ? 'Cancelled demonstration' : 'Demonstration reservation'} · {booking.id}</p><h2>{property.name}</h2><p><MapPin size={14} /> {destination?.name}, {destination?.country}</p><div className="trip-dates"><span>{booking.checkin}</span><ChevronRight size={14} /><span>{booking.checkout}</span><span>· {booking.guests} guests</span></div><Link to={`/stays/${property.id}`} className="text-link">View stay <ArrowRight size={14} /></Link></div><div className="trip-item-side"><span className={`status-label ${booking.status}`}>{booking.status}</span><strong>{formatNaira(booking.total)}</strong><span>{booking.nights} nights · demo total</span>{booking.status === 'upcoming' && <button className="cancel-booking" onClick={() => cancel(booking)}>Cancel demo booking</button>}</div></article> })}</div> : <div className="empty-state trips-empty"><Plane size={24} /><p className="eyebrow">Nothing on the horizon</p><h2>{tab === 'upcoming' ? 'Your next journey awaits.' : 'The map is still unfolding.'}</h2><p>{tab === 'upcoming' ? 'When you make a demonstration reservation, it will find its way here.' : 'Past and cancelled journeys will appear here.'}</p><Link className="button button-gold" to="/discover">Explore the collection <ArrowRight size={15} /></Link></div>}
    <section className="saved-section"><div className="section-heading"><div><p className="eyebrow">Kept close</p><h2>Your saved <em>places.</em></h2></div></div><h3 className="saved-subheading">Destinations</h3>{savedDestinations.length ? <div className="saved-destination-grid">{savedDestinations.map((destination) => <article className="saved-destination" key={destination.id}><Link to={`/destinations/${destination.id}`}><img src={destinationImage(destination, 700)} alt="" /><span><small>{destination.country}</small><strong>{destination.name}</strong></span></Link></article>)}</div> : <p className="saved-empty">Save a destination with the heart to find it here.</p>}<h3 className="saved-subheading">Stays</h3>{saved.length ? <div className="property-grid">{saved.map((property) => <PropertyCard key={property.id} property={property} favorites={favorites} toggleFavorite={toggleFavorite} />)}</div> : <p className="saved-empty">Save a stay with the heart to find it here.</p>}</section>
  </main>
}

export function SignIn({ register = false }) {
  const [submitted, setSubmitted] = useState(false)
  const [visible, setVisible] = useState(false)
  return <main className="account-page"><div className="account-image" /><div className="account-form-side"><form className="account-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}><p className="eyebrow">AURA / A personal journey</p><h1>{register ? 'Begin your' : 'Welcome'}<br /><em>{register ? 'AURA story.' : 'back.'}</em></h1><p>This is a frontend demonstration. No account or password is stored.</p>{register && <label>Full name<input autoComplete="name" required /></label>}<label>Email address<input type="email" autoComplete="email" required /></label><label>Password <span className="optional">Demo only</span><span className="password-input"><input type={visible ? 'text' : 'password'} minLength="6" autoComplete={register ? 'new-password' : 'current-password'} required /><button type="button" onClick={() => setVisible(!visible)}>{visible ? 'Hide' : 'Show'}</button></span></label><button className="button button-gold" type="submit">{register ? 'Create demo account' : 'Continue in demo mode'} <ArrowRight size={15} /></button>{submitted && <p className="form-message" role="status">Demo mode only. Connect an authentication service for a real account.</p>}<p className="account-switch">{register ? 'Already have an account?' : 'New to AURA?'} <Link to={register ? '/sign-in' : '/register'}>{register ? 'Sign in' : 'Create an account'}</Link></p></form></div></main>
}