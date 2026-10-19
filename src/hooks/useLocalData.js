import { useEffect, useState } from 'react'

function useStoredArray(key) {
  const [items, setItems] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(key) || '[]')
      return Array.isArray(stored) ? stored : []
    } catch {
      return []
    }
  })
  useEffect(() => localStorage.setItem(key, JSON.stringify(items)), [items, key])
  return [items, setItems]
}

export function useFavorites() {
  const [favorites, setFavorites] = useStoredArray('aura-favorites')
  const toggleFavorite = (id) => setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  return { favorites, toggleFavorite }
}

export function useBookings() {
  const [bookings, setBookings] = useStoredArray('aura-bookings')
  return { bookings, setBookings }
}