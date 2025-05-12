"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, SafeAreaView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useRouter, useLocalSearchParams } from "expo-router"
import type { Bus, Station } from "../types/idx"
import { fetchBusDetails, fetchStationsByIds } from "../api/busService"
import StationItem from "../../components/StationItem"

export const BusDetail = () => {
  const router = useRouter()
  const { bus: busParam } = useLocalSearchParams()

  const initialBus: Bus = JSON.parse(typeof busParam === "string" ? busParam : "{}")

  const [bus, setBus] = useState<Bus>(initialBus)
  const [stations, setStations] = useState<Station[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadBusDetails = async () => {
      try {
        setIsLoading(true)
        const busDetails = await fetchBusDetails(initialBus.id)
        setBus(busDetails)
        const stationsData = await fetchStationsByIds(busDetails.stations)
        setStations(stationsData)
      } catch (error) {
        console.error("Error loading bus details:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadBusDetails()
  }, [initialBus.id])

  const handleViewOnMap = () => {
    router.push({
      pathname: "./MapView",
      params: {
        bus: JSON.stringify(bus),
        stations: JSON.stringify(stations),
      },
    })
  }

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "on-time":
        return { text: "À l'heure", color: "#28a745" }
      case "delayed":
        return { text: "Retardé", color: "#ffc107" }
      case "out-of-service":
        return { text: "Hors service", color: "#dc3545" }
      default:
        return { text: "Inconnu", color: "#6c757d" }
    }
  }

  const statusInfo = getStatusInfo(bus.status)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Détails du bus</Text>
        <TouchableOpacity style={styles.mapButton} onPress={handleViewOnMap}>
          <Ionicons name="map" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0066CC" />
          <Text style={styles.loaderText}>Chargement des détails...</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.busInfoCard}>
            <View style={styles.busHeader}>
              <View style={[styles.busNumber, { backgroundColor: bus.color || "#0066CC" }]}>
                <Text style={styles.busNumberText}>{bus.number}</Text>
              </View>
              <View style={styles.busNameContainer}>
                <Text style={styles.busName}>{bus.name}</Text>
                <View style={styles.statusContainer}>
                  <View style={[styles.statusDot, { backgroundColor: statusInfo.color }]} />
                  <Text style={styles.statusText}>{statusInfo.text}</Text>
                </View>
              </View>
            </View>

            <View style={styles.routeContainer}>
              <View style={styles.routeEndpoint}>
                <Ionicons name="location" size={20} color="#0066CC" />
                <Text style={styles.stationName}>{bus.startStation}</Text>
                <Text style={styles.stationTime}>{bus.startTime}</Text>
              </View>

              <View style={styles.routeLine} />

              <View style={styles.routeEndpoint}>
                <Ionicons name="location" size={20} color="#0066CC" />
                <Text style={styles.stationName}>{bus.endStation}</Text>
                <Text style={styles.stationTime}>{bus.endTime}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Ionicons name="time-outline" size={18} color="#666" />
                <Text style={styles.infoText}>Fréquence: {bus.frequency}</Text>
              </View>
              <View style={styles.infoItem}>
                <Ionicons name="calendar-outline" size={18} color="#666" />
                <Text style={styles.infoText}>Jours: {bus.operatingDays}</Text>
              </View>
            </View>
          </View>

          <View style={styles.stationsSection}>
            <Text style={styles.sectionTitle}>Points d'arrêt</Text>
            <Text style={styles.stationCount}>{stations.length} stations</Text>

            {stations.map((station, index) => (
              <StationItem
                key={station.id}
                station={station}
                isFirst={index === 0}
                isLast={index === stations.length - 1}
                estimatedTime={station.estimatedTime}
              />
            ))}
          </View>
        </ScrollView>
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
  mapButton: {
    padding: 4,
  },
  content: {
    padding: 16,
  },
  busInfoCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  busHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  busNumber: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  busNumberText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  busNameContainer: {
    flex: 1,
  },
  busName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    color: "#666",
  },
  routeContainer: {
    marginBottom: 16,
  },
  routeEndpoint: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  routeLine: {
    width: 2,
    height: 24,
    backgroundColor: "#ddd",
    marginLeft: 10,
  },
  stationName: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
  },
  stationTime: {
    fontSize: 14,
    color: "#666",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 6,
  },
  stationsSection: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  stationCount: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
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

export default BusDetail
