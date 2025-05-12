import type { Bus, Station, BusLocation } from "../types/idx"


export const mockBuses: Bus[] = [
  {
    id: 1,
    number: 42,
    name: "Gare Centrale - Université",
    startStation: "Gare Centrale",
    endStation: "Université",
    startTime: "05:30",
    endTime: "23:30",
    frequency: "10-15 min",
    operatingDays: "Lun-Dim",
    status: "on-time",
    nextArrival: "3 min",
    stations: [1, 2, 3, 4, 5],
    color: "#0066CC",
  },
  {
    id: 2,
    number: 15,
    name: "Place du Marché - Hôpital",
    startStation: "Place du Marché",
    endStation: "Hôpital",
    startTime: "06:00",
    endTime: "22:00",
    frequency: "15-20 min",
    operatingDays: "Lun-Sam",
    status: "delayed",
    nextArrival: "7 min",
    stations: [6, 7, 8, 9],
    color: "#28a745",
  },
  {
    id: 3,
    number: 23,
    name: "Centre Commercial - Parc",
    startStation: "Centre Commercial",
    endStation: "Parc",
    startTime: "06:30",
    endTime: "21:30",
    frequency: "20 min",
    operatingDays: "Lun-Dim",
    status: "on-time",
    nextArrival: "12 min",
    stations: [10, 11, 12, 13, 14],
    color: "#dc3545",
  },
  {
    id: 4,
    number: 7,
    name: "Aéroport - Centre Ville",
    startStation: "Aéroport",
    endStation: "Centre Ville",
    startTime: "05:00",
    endTime: "00:00",
    frequency: "30 min",
    operatingDays: "Lun-Dim",
    status: "on-time",
    nextArrival: "18 min",
    stations: [15, 16, 17, 18],
    color: "#ffc107",
  },
  {
    id: 5,
    number: 31,
    name: "Stade - Bibliothèque",
    startStation: "Stade",
    endStation: "Bibliothèque",
    startTime: "07:00",
    endTime: "20:00",
    frequency: "25 min",
    operatingDays: "Lun-Ven",
    status: "out-of-service",
    nextArrival: "-",
    stations: [19, 20, 21, 22],
    color: "#6c757d",
  },
]


export const mockStations: Station[] = [
  { id: 1, name: "Gare Centrale", latitude: 48.8566, longitude: 2.3522, facilities: ["wheelchair", "wifi"] },
  { id: 2, name: "Opéra", latitude: 48.8604, longitude: 2.3315, facilities: ["wheelchair"] },
  { id: 3, name: "Bastille", latitude: 48.8531, longitude: 2.3691, facilities: ["bike-parking"] },
  { id: 4, name: "République", latitude: 48.8673, longitude: 2.3629, facilities: ["wheelchair", "bike-parking"] },
  { id: 5, name: "Université", latitude: 48.8456, longitude: 2.3444, facilities: ["wifi"] },
  { id: 6, name: "Place du Marché", latitude: 48.8744, longitude: 2.3526, facilities: [] },
  { id: 7, name: "Mairie", latitude: 48.8619, longitude: 2.3324, facilities: ["wheelchair"] },
  { id: 8, name: "Musée", latitude: 48.8611, longitude: 2.3364, facilities: ["wheelchair", "wifi"] },
  { id: 9, name: "Hôpital", latitude: 48.8399, longitude: 2.3523, facilities: ["wheelchair", "taxi"] },
  { id: 10, name: "Centre Commercial", latitude: 48.8757, longitude: 2.3477, facilities: ["wheelchair", "parking"] },
  { id: 11, name: "École", latitude: 48.8641, longitude: 2.34, facilities: [] },
  { id: 12, name: "Théâtre", latitude: 48.8619, longitude: 2.3386, facilities: ["wheelchair"] },
  { id: 13, name: "Jardin", latitude: 48.8634, longitude: 2.3343, facilities: ["bike-parking"] },
  { id: 14, name: "Parc", latitude: 48.8649, longitude: 2.31, facilities: ["bike-parking", "parking"] },
  { id: 15, name: "Aéroport", latitude: 48.7262, longitude: 2.3652, facilities: ["wheelchair", "wifi", "taxi"] },
  { id: 16, name: "Terminal 2", latitude: 48.7292, longitude: 2.3699, facilities: ["wheelchair", "wifi"] },
  { id: 17, name: "Périphérique", latitude: 48.8322, longitude: 2.4097, facilities: [] },
  { id: 18, name: "Centre Ville", latitude: 48.8534, longitude: 2.3488, facilities: ["wheelchair", "bike-parking"] },
  { id: 19, name: "Stade", latitude: 48.8417, longitude: 2.253, facilities: ["parking"] },
  { id: 20, name: "Piscine", latitude: 48.845, longitude: 2.2731, facilities: ["wheelchair"] },
  { id: 21, name: "Cinéma", latitude: 48.8507, longitude: 2.2855, facilities: ["wheelchair"] },
  { id: 22, name: "Bibliothèque", latitude: 48.8399, longitude: 2.3758, facilities: ["wheelchair", "wifi"] },
]


export const mockBusLocations: BusLocation[] = [
  {
    busId: 1,
    busNumber: 42,
    latitude: 48.8566,
    longitude: 2.3522,
    heading: 45,
    speed: 25,
    lastUpdated: new Date().toISOString(),
  },
  {
    busId: 2,
    busNumber: 15,
    latitude: 48.8744,
    longitude: 2.3526,
    heading: 180,
    speed: 18,
    lastUpdated: new Date().toISOString(),
  },
  {
    busId: 3,
    busNumber: 23,
    latitude: 48.8757,
    longitude: 2.3477,
    heading: 270,
    speed: 22,
    lastUpdated: new Date().toISOString(),
  },
  {
    busId: 4,
    busNumber: 7,
    latitude: 48.7262,
    longitude: 2.3652,
    heading: 0,
    speed: 30,
    lastUpdated: new Date().toISOString(),
  },
]


export const fetchBuses = async (): Promise<Bus[]> => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return mockBuses
}

export const fetchBusDetails = async (busId: number): Promise<Bus> => {
  await new Promise((resolve) => setTimeout(resolve, 600))
  const bus = mockBuses.find((b) => b.id === busId)
  if (!bus) throw new Error(`Bus with ID ${busId} not found`)
  return bus
}

export const fetchStations = async (): Promise<Station[]> => {
  await new Promise((resolve) => setTimeout(resolve, 700))
  return mockStations
}

export const fetchStationsByIds = async (stationIds: number[]): Promise<Station[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const stationsWithTimes = mockStations
    .filter((station) => stationIds.includes(station.id))
    .map((station, index) => {
      let estimatedTime
      if (index === 0) estimatedTime = "Départ"
      else if (index === stationIds.length - 1) estimatedTime = "Terminus"
      else estimatedTime = `${Math.floor(5 + Math.random() * 25)} min`

      return { ...station, estimatedTime }
    })

  return stationsWithTimes
}

export const fetchBusLocations = async (busIds: number[]): Promise<BusLocation[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockBusLocations
    .filter((location) => busIds.includes(location.busId))
    .map((location) => ({ ...location, lastUpdated: new Date().toISOString() }))
}

export default {
  fetchBuses,
  fetchBusDetails,
  fetchStations,
  fetchStationsByIds,
  fetchBusLocations,
}
