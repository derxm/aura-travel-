import { Heart, MoveUpRight, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { destinations, destinationImage, propertyImage } from '../data.js'
import { formatNaira } from '../utils/currency.js'

export function DestinationCard({ destination, className = '', favorites = [], toggleFavorite }) {
  const saved = favorites.includes(destination.id)
  return <motion.article className={`destination-tile ${className}`} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}>
    <Link className="destination-card" to={`/destinations/${destination.id}`} style={{ '--card-image': `url("${destinationImage(destination, 1000)}")` }}>
      <span className="destination-card-copy"><span className="destination-region">{destination.country} · {destination.region}</span><strong>{destination.name}</strong><span className="destination-desc">{destination.description}</span></span><span className="destination-arrow"><MoveUpRight size={19} /></span>
    </Link>
    {toggleFavorite && <motion.button whileTap={{ scale: 0.88 }} className={`destination-favorite ${saved ? 'is-favorite' : ''}`} type="button" aria-label={saved ? `Remove ${destination.name} from saved destinations` : `Save ${destination.name}`} aria-pressed={saved} onClick={() => toggleFavorite(destination.id)}><Heart size={17} fill={saved ? 'currentColor' : 'none'} /></motion.button>}
  </motion.article>
}

export function PropertyCard({ property, favorites, toggleFavorite }) {
  const destination = destinations.find((item) => item.id === property.destinationId)
  const saved = favorites?.includes(property.id)
  return <motion.article className="property-card" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}>
    <Link className="property-image" to={`/stays/${property.id}`}><img src={propertyImage(property, 900)} alt={`${property.name}, ${destination?.name}`} loading="lazy" /><span className="property-category">{property.category}</span></Link>
    <motion.button whileTap={{ scale: 0.88 }} className={`favorite-button ${saved ? 'is-favorite' : ''}`} type="button" aria-label={saved ? `Remove ${property.name} from saved stays` : `Save ${property.name}`} aria-pressed={saved} onClick={() => toggleFavorite?.(property.id)}><Heart size={18} fill={saved ? 'currentColor' : 'none'} /></motion.button>
    <div className="property-info"><div className="property-title-row"><Link to={`/stays/${property.id}`}><h3>{property.name}</h3></Link><span className="property-rating"><Star size={13} fill="currentColor" /> {property.rating}</span></div><p>{destination?.name}, {destination?.country}</p><div className="property-price"><span>From <strong>{formatNaira(property.price)}</strong> / night</span><span className="review-count">{property.reviews} considered stays</span></div></div>
  </motion.article>
}