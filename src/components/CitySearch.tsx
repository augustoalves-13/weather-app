import React, { useState } from 'react'
import { Search } from 'lucide-react'

interface CitySearchProps {
  onCityChange: (city: string) => void
}

const CitySearch: React.FC<CitySearchProps> = ({ onCityChange }) => {
  const [city, setCity] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (city.trim()) {
      onCityChange(city.trim())
      setCity('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative mb-6">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Digite o nome da cidade"
        className="w-full py-2 pl-4 pr-10 rounded-full bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white"
      >
        <Search className="w-5 h-5" />
      </button>
    </form>
  )
}

export default CitySearch

