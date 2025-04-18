export interface Bus {
  id: number
  number: number
  name: string
  startStation: string
  endStation: string
  startTime: string
  endTime: string
  frequency: string
  operatingDays: string
  status: string // 'on-time', 'delayed', 'out-of-service'
  nextArrival: string
  stations: number[]
  color: string
}

export type RootStackParamList = {
  BusDetail: { bus: Bus }
  MapView: { buses: Bus[] }
}

export interface Station {
  id: number
  name: string
  latitude: number
  longitude: number
  facilities: string[] // 'wheelchair', 'bike-parking', etc.
  estimatedTime?: string
}

export interface BusLocation {
  busId: number
  busNumber: number
  latitude: number
  longitude: number
  heading: number
  speed: number
  lastUpdated: string
}

export default {
  Bus: {} as Bus,
  Station: {} as Station,
  BusLocation: {} as BusLocation,
  RootStackParamList: {} as RootStackParamList,
}
