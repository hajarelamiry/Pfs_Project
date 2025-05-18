import type { Bus, Station, BusLocation } from "../types/idx"
import { API_URL } from "../../config"



export const fetchBuses = async (): Promise<Bus[]> => {
  try {
    const response = await fetch(`${API_URL}/api/buses/allBuses`)
    if (!response.ok) {
      throw new Error('Failed to fetch buses')
    }
    const data = await response.json()
    return data.map((bus: any) => ({
      id: bus.id,
      name: bus.busType?.name || '',
      capacity: bus.capacity,
      busType: bus.busType,
      wifi: bus.wifi,
      charging: bus.charging,
      security: bus.security,
      statut: bus.statut,
      driver: bus.driver,
      stations: bus.stations
    }))
  } catch (error) {
    console.error('Error fetching buses:', error)
    throw error
  }
}

export const fetchBusDetails = async (busId: number): Promise<Bus> => {
  try {
    const response = await fetch(`${API_URL }/api/buses/getBus/${busId}`)
    if (!response.ok) {
      throw new Error(`Bus with ID ${busId} not found`)
    }
    const bus = await response.json()
    return {
      id: bus.id,
      name: bus.busType?.name || '',
      capacity: bus.capacity,
      busType: bus.busType,
      wifi: bus.wifi,
      charging: bus.charging,
      security: bus.security,
      statut: bus.statut,
      driver: bus.driver,
      stations: bus.stations
    }
  } catch (error) {
    console.error('Error fetching bus details:', error)
    throw error
  }
}

export const fetchStations = async (): Promise<Station[]> => {
  try {
    const response = await fetch(`${API_URL}/api/stations`)
    if (!response.ok) {
      throw new Error('Failed to fetch stations')
    }
    const data = await response.json()
    return data.map((station: any) => ({
      id: station.id,
      name: station.name,
      positionActuelle: station.positionActuelle,
      buses: station.buses
    }))
  } catch (error) {
    console.error('Error fetching stations:', error)
    throw error
  }
}

export const fetchStationsByIds = async (stationIds: number[]): Promise<Station[]> => {
  try {
    const stations = await fetchStations()
    return stations
      .filter((station) => stationIds.includes(station.id))
      .map((station, index) => {
        let estimatedTime
        if (index === 0) estimatedTime = "Départ"
        else if (index === stationIds.length - 1) estimatedTime = "Terminus"
        else estimatedTime = `${Math.floor(5 + Math.random() * 25)} min`

        return { ...station, estimatedTime }
      })
  } catch (error) {
    console.error('Error fetching stations by IDs:', error)
    throw error
  }
}

export const fetchBusLocations = async (busIds: number[]): Promise<BusLocation[]> => {
  try {
    const response = await fetch(`${API_URL}/api/buses/locations?ids=${busIds.join(',')}`)
    if (!response.ok) {
      throw new Error('Failed to fetch bus locations')
    }
    const data = await response.json()
    return data.map((location: any) => ({
      busId: location.busId,
      busNumber: location.busNumber,
      latitude: location.latitude,
      longitude: location.longitude,
      heading: location.heading,
      speed: location.speed,
      lastUpdated: location.lastUpdated,
    }))
  } catch (error) {
    console.error('Error fetching bus locations:', error)
    throw error
  }
}

export default {
  fetchBuses,
  fetchBusDetails,
  fetchStations,
  fetchStationsByIds,
  fetchBusLocations,
}
