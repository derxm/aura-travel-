import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CalendarDays, MapPin, Search, Users } from 'lucide-react'
import { destinations } from '../data.js'

const TODAY = new Date().toISOString().slice(0, 10)

export function BookingSearch({ initial = '' }) {
  const navigate = useNavigate()
  const [destination, setDestination] = useState(initial)
  const [checkin, setCheckin] = useState('')
  const [checkout, setCheckout] = useState('')
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [error, setError] = useState('')
  const matches = destination ? destinations.filter((item) => `${item.name} ${item.country}`.toLowerCase().includes(destination.toLowerCase())).slice(0, 4) : []
  const submit = (event) => {
    event.preventDefault()
    if (checkin && checkout && checkout <= checkin) return setError('Your departure should be after your arrival.')
    if (!destination.trim()) return setError('Choose a destination to begin exploring.')
    setError('')
    const params = new URLSearchParams({ destination, adults: String(adults), children: String(children) })
    if (checkin) params.set('checkin', checkin)
    if (checkout) params.set('checkout', checkout)
    navigate(`/discover?${params}`)
  }
  return <form className="booking-search" onSubmit={submit}>
    <label className="search-field destination-field"><span className="field-icon"><MapPin size={17} /></span><span className="field-content"><span className="field-label">Destination</span><input value={destination} onChange={(event) => setDestination(event.target.value)} placeholder="Where do you want to go?" autoComplete="off" aria-label="Destination" /></span>
      {matches.length > 0 && <div className="suggestions" role="listbox">{matches.map((item) => <button type="button" key={item.id} onClick={() => setDestination(`${item.name}, ${item.country}`)}>{item.name}<span>{item.country}</span></button>)}</div>}
    </label>
    <label className="search-field"><span className="field-icon"><CalendarDays size={17} /></span><span className="field-content"><span className="field-label">Check in</span><input type="date" min={TODAY} value={checkin} onChange={(event) => setCheckin(event.target.value)} aria-label="Check-in date" /></span></label>
    <label className="search-field"><span className="field-icon"><CalendarDays size={17} /></span><span className="field-content"><span className="field-label">Check out</span><input type="date" min={checkin || TODAY} value={checkout} onChange={(event) => setCheckout(event.target.value)} aria-label="Check-out date" /></span></label>
    <div className="search-field guests-field"><span className="field-icon"><Users size={17} /></span><div className="field-content"><span className="field-label">Guests</span><span className="guest-count">{adults + children} guests</span><div className="guest-stepper"><span>Adults</span><button type="button" aria-label="Remove adult" onClick={() => setAdults(Math.max(1, adults - 1))}>−</button><span>{adults}</span><button type="button" aria-label="Add adult" onClick={() => setAdults(Math.min(12, adults + 1))}>+</button><span>Children</span><button type="button" aria-label="Remove child" onClick={() => setChildren(Math.max(0, children - 1))}>−</button><span>{children}</span><button type="button" aria-label="Add child" onClick={() => setChildren(Math.min(8, children + 1))}>+</button></div></div></div>
    <button className="search-submit" type="submit"><Search size={17} /><span>Explore stays</span></button>
    {error && <p className="search-error" role="alert">{error}</p>}
  </form>
}