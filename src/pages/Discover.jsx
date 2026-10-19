import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowUpDown, SlidersHorizontal, X } from 'lucide-react'
import { destinations, properties } from '../data.js'
import { PropertyCard } from '../components/Cards.jsx'
import { formatNaira } from '../utils/currency.js'

export function Discover({ favorites, toggleFavorite }) {
  const [params, setParams] = useSearchParams()
  const [destination, setDestination] = useState(params.get('destination') || '')
  const [query, setQuery] = useState('')
  const [type, setType] = useState('Any type')
  const [maxPrice, setMaxPrice] = useState('')
  const [minRating, setMinRating] = useState('')
  const [sort, setSort] = useState('recommended')
  const normalized = (value) => value.toLowerCase().trim().replace(/[\s,]+/g, ' ')
  const partySize = Number(params.get('adults') || 0) + Number(params.get('children') || 0)
  const filtered = useMemo(() => {
    const filteredProperties = properties.filter((property) => {
      const place = destinations.find((item) => item.id === property.destinationId)
      const locationMatch = !destination || normalized(`${place?.name} ${place?.country}`).includes(normalized(destination))
      const queryMatch = !query || `${property.name} ${property.category} ${place?.name}`.toLowerCase().includes(normalized(query))
      return locationMatch && queryMatch && (type === 'Any type' || property.category.toLowerCase().includes(type.toLowerCase())) && (!maxPrice || property.price <= Number(maxPrice)) && (!minRating || property.rating >= Number(minRating)) && (!partySize || property.guests >= partySize)
    })
    if (sort === 'price-low') filteredProperties.sort((a, b) => a.price - b.price)
    if (sort === 'price-high') filteredProperties.sort((a, b) => b.price - a.price)
    if (sort === 'rating') filteredProperties.sort((a, b) => b.rating - a.rating)
    return filteredProperties
  }, [destination, query, type, maxPrice, minRating, sort, partySize])
  const updateDestination = (value) => { setDestination(value); const next = new URLSearchParams(params); if (value) next.set('destination', value); else next.delete('destination'); setParams(next, { replace: true }) }
  const clearFilters = () => { setDestination(''); setQuery(''); setType('Any type'); setMaxPrice(''); setMinRating(''); setSort('recommended'); setParams({}, { replace: true }) }
  return <main className="discover-page">
    <div className="discover-heading"><p className="eyebrow">The AURA collection</p><h1>Find your <em>somewhere.</em></h1><p>Considered places to stay, selected for the way they make you feel.</p></div>
    <div className="discover-toolbar"><label><span className="sr-only">Search stays</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search stays or places" /></label><label><span className="sr-only">Filter by destination</span><select value={destination} onChange={(event) => updateDestination(event.target.value)}><option value="">Everywhere</option>{destinations.map((item) => <option value={item.name} key={item.id}>{item.name}, {item.country}</option>)}</select></label><label><span className="sr-only">Filter by accommodation type</span><select value={type} onChange={(event) => setType(event.target.value)}><option>Any type</option><option>villa</option><option>suite</option><option>ryokan</option><option>retreat</option><option>riad</option></select></label><label><span className="sr-only">Maximum price per night</span><select value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)}><option value="">Any price</option><option value="900000">Up to {formatNaira(900000)}</option><option value="1200000">Up to {formatNaira(1200000)}</option><option value="1500000">Up to {formatNaira(1500000)}</option></select></label><label><span className="sr-only">Minimum guest rating</span><select value={minRating} onChange={(event) => setMinRating(event.target.value)}><option value="">Any rating</option><option value="4.9">4.9 and above</option><option value="4.95">4.95 and above</option></select></label><label className="sort-control"><ArrowUpDown size={14} /><span className="sr-only">Sort results</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="recommended">Recommended</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="rating">Guest rating</option></select></label></div>
    <div className="results-heading"><p><SlidersHorizontal size={15} /> <strong>{filtered.length}</strong> considered stays</p><button type="button" onClick={clearFilters}>Clear filters <X size={14} /></button></div>
    {filtered.length ? <div className="property-grid discover-grid">{filtered.map((property) => <PropertyCard key={property.id} property={property} favorites={favorites} toggleFavorite={toggleFavorite} />)}</div> : <div className="empty-state"><p className="eyebrow">A quiet corner of the map</p><h2>No stays match just yet.</h2><p>Try another destination or loosen your filters to see what finds you.</p><button className="button button-outline" onClick={clearFilters}>Clear all filters</button></div>}
    <section className="destination-strip"><p className="eyebrow">Go where the feeling takes you</p>{destinations.map((item) => <Link to={`/destinations/${item.id}`} key={item.id}>{item.name}<span>{item.country}</span></Link>)}</section>
  </main>
}