import { useEffect, useRef, useState } from "react"
import { View, StyleSheet, SafeAreaView, Text, Alert } from "react-native"
import * as Location from "expo-location"
import { MapPin } from "lucide-react-native"
import StatusIndicator from "../../components/StatusIndicator"
import StartTripButton from "../../components/StartTripButton"

export type DriverStatus = "available" | "paused" | "on_trip"

export default function DriverDashboard() {
  const [driverStatus, setDriverStatus] = useState<DriverStatus>("available")
  const [isTripActive, setIsTripActive] = useState(false)
  const [positionId, setPositionId] = useState<number | null>(null)
  const socketRef = useRef<WebSocket | null>(null)
  const locationIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startSendingLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== "granted") {
      Alert.alert("Permission refusée", "La permission de localisation est requise.")
      return
    }

    const location = await Location.getCurrentPositionAsync({})
    sendLocationToServer(location.coords)

    // envoyer toutes les 5 minutes
    locationIntervalRef.current = setInterval(async () => {
      const updatedLocation = await Location.getCurrentPositionAsync({})
      sendLocationToServer(updatedLocation.coords)
    }, 5 * 60 * 1000)
  }

  const stopSendingLocation = () => {
    if (locationIntervalRef.current !== null) {
      clearInterval(locationIntervalRef.current)
      locationIntervalRef.current = null
    }
    if (socketRef.current) {
      socketRef.current.close()
      socketRef.current = null
    }
  }

  const sendLocationToServer = (coords: Location.LocationObjectCoords) => {
    const data = {
      lat: coords.latitude,      
      lng: coords.longitude,     
      timestamp: new Date().toISOString()
    }
  

    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(data))
    }
  }

  const connectToWebSocket = () => {
    socketRef.current = new WebSocket("ws://100.89.161.136:8003/ws/position?token=h200317&username=admin")

    socketRef.current.onopen = () => {
      console.log("Connexion WebSocket établie")
    }

    socketRef.current.onerror = (error) => {
      console.log("Erreur WebSocket", error)
    }

    socketRef.current.onclose = () => {
      console.log("Connexion WebSocket fermée")
    }
  }

  const handleStartTrip = () => {
    setIsTripActive(true)
    setDriverStatus("on_trip")
    connectToWebSocket()
    startSendingLocation()
  }

  const handleEndTrip = () => {
    setIsTripActive(false)
    setDriverStatus("available")
    stopSendingLocation()
  }

  const toggleStatus = (newStatus: DriverStatus) => {
    if (isTripActive && newStatus !== "on_trip") {
      return
    }
    setDriverStatus(newStatus)
  }

  useEffect(() => {
    return () => {
      stopSendingLocation()
    }
  }, [])

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
