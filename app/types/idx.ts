export interface PositionGps {
  id: number
  lat: number
  lng: number
  timestamp: string
}

export interface Station {
  id: number
  name: string
  ordre: number
  positionActuelle: PositionGps
  buses?: Bus[]
}

export interface BusType {
  id: number
  name: string
  firstStation: string
  lastStation: string
  color?: string

  buses?: Bus[]
  stations?: Station[]
}

export interface Driver {
  id: number
  firstName : string}

export interface Bus {
  id: number
  name: string
  capacity: number
  busType?: BusType
  wifi: boolean
  charging: boolean
  security: boolean
  statut: string
  driver?: Driver
  stations: Station[]
}

// Interface pour la vue frontend (pour la compatibilité avec l'ancien code)


export interface BusLocation {
  busId: number
  busNumber: number
  latitude: number
  longitude: number
  heading: number
  speed: number
  lastUpdated: string
}

export type RootStackParamList = {
  BusDetail: { bus: Bus}
  MapView: { buses: Bus[] }
}

export default {
  Bus: {} as Bus,
  BusView: {} as Bus,
  Station: {} as Station,
  BusLocation: {} as BusLocation,
  RootStackParamList: {} as RootStackParamList,
  BusType: {} as BusType,
  Driver: {} as Driver,
  PositionGps: {} as PositionGps,
}
