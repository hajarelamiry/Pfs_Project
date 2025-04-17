"use client"

import { useState, useEffect, useRef } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator, SafeAreaView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation, useRoute } from "@react-navigation/native"
import MapView, { Polyline, PROVIDER_GOOGLE, type Region } from "react-native-maps"
import * as Location from "expo-location"
import type { Bus, Station, BusLocation } from "../types/index"
import { fetchBusLocations  } from "../api/busService"
import BusMarker from "../../components/BusMarker"
import StationMarker from "../../components/StationMarker"


const MapScreen = () => {
  const navigation = useNavigation()
  
  const route = useRoute()
  const {
    bus,
    buses,
    stations: routeStations,
  } = route.params as {
    bus?: Bus
    buses?: Bus[]
    stations?: Station[]
  }

  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null)
  const [busLocations, setBusLocations] = useState<BusLocation[]>([])
  const [stations, setStations] = useState<Station[]>(routeStations || [])
  const [selectedBus, setSelectedBus] = useState<Bus | null>(bus || null)
  const [isLoading, setIsLoading] = useState(true)
  const [region, setRegion] = useState<Region>({
    latitude: 48.8566, 
    longitude: 2.3522,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  })

  const mapRef = useRef<MapView>(null)
  const locationUpdateInterval = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const requestLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({})
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        })

        // Update region to user's location
        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        })
      }
    }

    requestLocationPermission()
  }, [])

  useEffect(() => {
    const loadBusLocations = async () => {
      try {
        setIsLoading(true)

        // Fetch bus locations
        let locations: BusLocation[] = []
        if (bus) {
          // If a specific bus is selected, only fetch its location
          const busLocation = await fetchBusLocations([bus.id])
          locations = busLocation
        } else if (buses) {
          // If multiple buses are provided, fetch all their locations
          const busIds = buses.map((b) => b.id)
          locations = await fetchBusLocations(busIds)
        }

        setBusLocations(locations)

        // If we have locations and no user location yet, center the map on the first bus
        if (locations.length > 0 && !userLocation) {
          setRegion({
            latitude: locations[0].latitude,
            longitude: locations[0].longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          })
        }
      } catch (error) {
        console.error("Error loading bus locations:", error)
      } finally {
        setIsLoading(false)
      }
    }

    // Load bus locations initially
    loadBusLocations()

    // Set up interval to update bus locations
    locationUpdateInterval.current = setInterval(loadBusLocations, 10000) // Update every 10 seconds

    return () => {
      // Clean up interval on component unmount
      if (locationUpdateInterval.current) {
        clearInterval(locationUpdateInterval.current)
      }
    }
  }, [bus, buses, userLocation])

  const handleBusSelect = (selectedBus: Bus) => {
    setSelectedBus(selectedBus)

    // Find the bus location
    const busLocation = busLocations.find((loc) => loc.busId === selectedBus.id)

    if (busLocation) {
      // Animate to the bus location
      mapRef.current?.animateToRegion({
        latitude: busLocation.latitude,
        longitude: busLocation.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      })
    }
  }

  const handleCenterOnUser = () => {
    if (userLocation) {
      mapRef.current?.animateToRegion({
        ...userLocation,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      })
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>{selectedBus ? `Bus ${selectedBus.number}` : "Carte des bus"}</Text>
        <View style={styles.placeholder} />
      </View>

      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0066CC" />
          <Text style={styles.loaderText}>Chargement de la carte...</Text>
        </View>
      ) : (
        <View style={styles.mapContainer}>
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={region}
            showsUserLocation
            showsMyLocationButton={false}
          >
            {/* Render bus markers */}
            {busLocations.map((location) => (
              <BusMarker key={location.busId} location={location} isSelected={selectedBus?.id === location.busId} />
            ))}

            {/* Render station markers if a bus is selected */}
            {selectedBus && stations.map((station) => <StationMarker key={station.id} station={station} />)}

            {/* Render route line if a bus is selected */}
            {selectedBus && stations.length > 1 && (
              <Polyline
                coordinates={stations.map((station) => ({
                  latitude: station.latitude,
                  longitude: station.longitude,
                }))}
                strokeColor="#0066CC"
                strokeWidth={3}
                lineDashPattern={[1, 3]}
              />
            )}
          </MapView>

          {/* Map controls */}
          <View style={styles.mapControls}>
            <TouchableOpacity style={styles.controlButton} onPress={handleCenterOnUser}>
              <Ionicons name="locate" size={24} color="#0066CC" />
            </TouchableOpacity>
          </View>

          {/* Bus selector if multiple buses */}
          {buses && buses.length > 0 && (
            <View style={styles.busSelector}>
              <Text style={styles.busSelectorTitle}>Sélectionner un bus</Text>
              <View style={styles.busList}>
                {buses.map((bus) => (
                  <TouchableOpacity
                    key={bus.id}
                    style={[styles.busItem, selectedBus?.id === bus.id && styles.selectedBusItem]}
                    onPress={() => handleBusSelect(bus)}
                  >
                    <Text style={[styles.busItemText, selectedBus?.id === bus.id && styles.selectedBusItemText]}>
                      {bus.number}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#0066CC",
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  placeholder: {
    width: 32,
  },
  mapContainer: {
    flex: 1,
    position: "relative",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  mapControls: {
    position: "absolute",
    right: 16,
    bottom: 100,
  },
  controlButton: {
    backgroundColor: "#fff",
    borderRadius: 30,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  busSelector: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  busSelectorTitle: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  busList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  busItem: {
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedBusItem: {
    backgroundColor: "#0066CC",
  },
  busItemText: {
    fontSize: 14,
    fontWeight: "500",
  },
  selectedBusItemText: {
    color: "#fff",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
})

export default MapScreen
