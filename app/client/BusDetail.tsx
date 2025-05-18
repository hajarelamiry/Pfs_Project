import { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation, useRoute } from "@react-navigation/native"
import type { Bus, Station, RootStackParamList } from "../types/idx"
import { fetchBusDetails, fetchStationsByIds } from "../api/busService"
import StationItem from "../../components/StationItem"
import type { RouteProp } from "@react-navigation/native"

type BusDetailRouteProp = RouteProp<RootStackParamList, "BusDetail">

const BusDetail = () => {
  const navigation = useNavigation()
  const route = useRoute<BusDetailRouteProp>()
  const { bus: initialBus } = route.params

  const [busDetails, setBusDetails] = useState<Bus | null>(null)
  const [stations, setStations] = useState<Station[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadBusDetails = async () => {
      try {
        setIsLoading(true)
        const fetchedBusDetails = await fetchBusDetails(initialBus.id)
        setBusDetails(fetchedBusDetails)
        const fetchedStations = await fetchStationsByIds(
          fetchedBusDetails.stations.map((s) => s.id)
        )
        setStations(fetchedStations)
      } catch (error) {
        console.error("Erreur lors du chargement des détails du bus :", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadBusDetails()
  }, [initialBus.id])

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

  const statusInfo = getStatusInfo(busDetails?.statut || "")

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0066CC" />
        <Text style={styles.loaderText}>Chargement des détails du bus...</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Détails du Bus</Text>
        <TouchableOpacity style={styles.mapButton}>
          <Ionicons name="map" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.busInfoCard}>
          <View style={styles.busHeader}>
            <View style={[styles.busNumber, { backgroundColor: "#0066CC" }]}>
              <Text style={styles.busNumberText}>{busDetails?.name}</Text>
            </View>
            <View style={styles.busNameContainer}>
              <Text style={styles.busName}>{busDetails?.name}</Text>
              <View style={styles.statusContainer}>
                <View
                  style={[styles.statusDot, { backgroundColor: statusInfo.color }]}
                />
                <Text style={styles.statusText}>{statusInfo.text}</Text>
              </View>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Ionicons name="person" size={16} color="#666" />
              <Text style={styles.infoText}>
                {busDetails?.driver?.firstName || "Chauffeur inconnu"}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="bus" size={16} color="#666" />
              <Text style={styles.infoText}>{busDetails.busType.stations.length} arrêts</Text>
            </View>
          </View>
        </View>

        <View style={styles.stationsSection}>
          <Text style={styles.sectionTitle}>Liste des stations</Text>
          <Text style={styles.stationCount}>
            {busDetails?.busType?.stations?.length || 0} stations au total
          </Text>
          {busDetails?.busType?.stations?.map((station, index) => (
            <View key={station.id} style={styles.stationItem}>
              <Ionicons name="location-sharp" size={20} color="#0066CC" />
              <Text style={styles.stationName}>{station.name}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
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
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
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
  stationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
  },
  stationName: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
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
