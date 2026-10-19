export const destinations = [
  { id: 'bali', name: 'Bali', country: 'Indonesia', region: 'Southeast Asia', image: 'photo-1537996194471-e657df975ab4', description: 'A slower rhythm, where jungle temples meet the Indian Ocean.', bestTime: 'April to October', count: 18 },
  { id: 'santorini', name: 'Santorini', country: 'Greece', region: 'Cyclades', image: 'photo-1570077188670-e3a8d69ac5ff', description: 'Whitewashed villages and evenings that belong to the Aegean.', bestTime: 'May to October', count: 12 },
  { id: 'kyoto', name: 'Kyoto', country: 'Japan', region: 'Kansai', image: 'photo-1493976040374-85c8e12f0c0e', description: 'Quiet lanes, ancient gardens, and the art of noticing.', bestTime: 'March to May, October to November', count: 9 },
  { id: 'cape-town', name: 'Cape Town', country: 'South Africa', region: 'Western Cape', image: 'photo-1580060839134-75a5edca2e99', description: 'Where mountains descend into a city with its own wild edge.', bestTime: 'November to March', count: 11 },
  { id: 'marrakech', name: 'Marrakech', country: 'Morocco', region: 'Marrakesh-Safi', image: 'photo-1539020140153-e479b8c22e70', description: 'A sensory world of courtyards, craft, and rose-colored light.', bestTime: 'March to May, September to November', count: 8 },
  { id: 'amalfi', name: 'Amalfi Coast', country: 'Italy', region: 'Campania', image: 'photo-1533105079780-92b9be482077', description: 'A ribbon of villages suspended between cliff and sea.', bestTime: 'May to September', count: 14 },
]

const image = (id, width = 1100) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`

export const properties = [
  { id: 'casa-luma', name: 'Casa Luma', destinationId: 'bali', category: 'Private villa', price: 1020000, rating: 4.98, reviews: 42, guests: 4, bedrooms: 2, bathrooms: 2, image: 'photo-1600210492486-724fe5c67fb0', description: 'A quiet, open-air sanctuary tucked into the green heart of Ubud, where slow mornings begin beside your private pool.', amenities: ['Private pool', 'Garden', 'Daily breakfast', 'Air conditioning'] },
  { id: 'the-aegean-house', name: 'The Aegean House', destinationId: 'santorini', category: 'Cliffside suite', price: 1410000, rating: 4.96, reviews: 36, guests: 2, bedrooms: 1, bathrooms: 1, image: 'photo-1600607687920-4e2a09cf159d', description: 'Carved into the caldera, a considered hideaway with a terrace made for the last light of day.', amenities: ['Caldera terrace', 'Plunge pool', 'Breakfast', 'Concierge'] },
  { id: 'sora-ryokan', name: 'Sora House', destinationId: 'kyoto', category: 'Private ryokan', price: 780000, rating: 4.92, reviews: 28, guests: 3, bedrooms: 2, bathrooms: 1, image: 'photo-1600607687939-ce8a6c25118c', description: 'A contemporary ryokan arranged around a moss garden, a thoughtful pause in the old capital.', amenities: ['Moss garden', 'Onsen bath', 'Tea service', 'Bicycle hire'] },
  { id: 'atlantic-view', name: 'Atlantic View', destinationId: 'cape-town', category: 'Coastal retreat', price: 1140000, rating: 4.94, reviews: 31, guests: 4, bedrooms: 2, bathrooms: 2, image: 'photo-1600607687920-4e2a09cf159d', description: 'An architectural retreat between mountain and sea, with generous windows that bring the landscape in.', amenities: ['Ocean view', 'Heated pool', 'Private chef', 'Fireplace'] },
  { id: 'riad-noor', name: 'Riad Noor', destinationId: 'marrakech', category: 'Private riad', price: 645000, rating: 4.97, reviews: 51, guests: 4, bedrooms: 2, bathrooms: 2, image: 'photo-1600210492486-724fe5c67fb0', description: 'Behind an unassuming door in the medina, find a peaceful courtyard and warm hospitality.', amenities: ['Courtyard', 'Rooftop terrace', 'Hammam', 'Breakfast'] },
  { id: 'villa-celeste', name: 'Villa Celeste', destinationId: 'amalfi', category: 'Seaside villa', price: 1680000, rating: 4.99, reviews: 19, guests: 6, bedrooms: 3, bathrooms: 3, image: 'photo-1613977257363-707ba9348227', description: 'A private home above the coast, where lemon groves lead down to the water.', amenities: ['Sea access', 'Terrace', 'Lemon garden', 'Private dining'] },
]

export const destinationImage = (destination, width = 1100) => image(destination.image, width)
export const propertyImage = (property, width = 1100) => image(property.image, width)
export const imageUrl = image

export const experiences = [
  { title: 'Private escapes', place: 'A quieter kind of somewhere', image: 'photo-1518837695005-2083093ee35b', destinationId: 'amalfi' },
  { title: 'Culinary journeys', place: 'A place, tasted slowly', image: 'photo-1517248135467-4c7edcad34c4', destinationId: 'kyoto' },
  { title: 'Cultural discoveries', place: 'Closer to the heart of it', image: 'photo-1524492412937-b28074a5d7da', destinationId: 'marrakech' },
  { title: 'Wellness retreats', place: 'Room to find your balance', image: 'photo-1540555700478-4be289fbecef', destinationId: 'bali' },
  { title: 'Outdoor adventures', place: 'The long way around', image: 'photo-1464822759023-fed622ff2c3b', destinationId: 'cape-town' },
]