"use client"

import { useState } from "react"
import { View, StyleSheet, SafeAreaView, Text } from "react-native"
import { MapPin } from "lucide-react-native"
import StatusIndicator from "../../components/StatusIndicator"
import StartTripButton from "../../components/StartTripButton"


export type DriverStatus = "available" | "paused" | "on_trip"

export default function DriverDashboard() {
  const [driverStatus, setDriverStatus] = useState<DriverStatus>("available")
  const [isTripActive, setIsTripActive] = useState(false)

  const handleStartTrip = () => {
    setIsTripActive(true)
    setDriverStatus("on_trip")
  }

  const handleEndTrip = () => {
    setIsTripActive(false)
    setDriverStatus("available")
  }

  const toggleStatus = (newStatus: DriverStatus) => {
    if (isTripActive && newStatus !== "on_trip") {
      return
    }
    setDriverStatus(newStatus)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tableau de bord chauffeur</Text>
      </View>

      <StatusIndicator currentStatus={driverStatus} onStatusChange={toggleStatus} disabled={isTripActive} />

      <View style={styles.mapPlaceholder}>
        <MapPin size={48} color="#0070f3" />
        <Text style={styles.mapText}>{isTripActive ? "Trajet en cours..." : "Prêt à démarrer"}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <StartTripButton isActive={isTripActive} onStart={handleStartTrip} onEnd={handleEndTrip} />
      </View>

      <View style={styles.statusInfo}>
        <Text style={styles.statusText}>
          Statut actuel:{" "}
          <Text style={styles.statusHighlight}>
            {driverStatus === "available" ? "Disponible" : driverStatus === "paused" ? "En pause" : "En route"}
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 16,
    backgroundColor: "#0070f3",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e1e1e1",
    margin: 16,
    borderRadius: 12,
  },
  mapText: {
    marginTop: 12,
    fontSize: 16,
    color: "#333",
  },
  buttonContainer: {
    padding: 16,
  },
  statusInfo: {
    padding: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  statusText: {
    fontSize: 16,
    color: "#333",
  },
  statusHighlight: {
    fontWeight: "bold",
    color: "#0070f3",
  },
})
