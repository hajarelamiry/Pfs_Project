import React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import type { Bus } from "../app/types/idx"

interface BusItemProps {
  bus: Bus
  onPress: () => void
}

const BusItem = ({ bus, onPress }: BusItemProps) => {
  // Determine status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-time":
        return "#28a745"
      case "delayed":
        return "#ffc107"
      case "out-of-service":
        return "#dc3545"
      default:
        return "#6c757d"
    }
  }

  const statusColor = getStatusColor(bus.statut)

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.leftSection}>
        <View style={[styles.busNumber, { backgroundColor: "#0066CC" }]}>
          <Text style={styles.busNumberText}>{bus.busType.name}</Text>
        </View>
      </View>

      <View style={styles.middleSection}>
        <Text style={styles.busName}>{bus.busType.name}</Text>
        <View style={styles.routeInfo}>
          <Text style={styles.routeText} numberOfLines={1}>
            {bus.busType.firstStation} → {bus.busType.lastStation}
          </Text>
        </View>
        <View style={styles.stationsInfo}>
          <Ionicons name="location" size={14} color="#666" />
          <Text style={styles.stationsText}>{(bus.busType?.stations?.length ?? 0) + 2} arrêts</Text>
        </View>
      </View>

      <View style={styles.rightSection}>
        <View style={[styles.statusIndicator, { backgroundColor: statusColor }]} />
      
        <Ionicons name="chevron-forward" size={20} color="#ccc" />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  leftSection: {
    justifyContent: "center",
    marginRight: 12,
  },
  busNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  busNumberText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  middleSection: {
    flex: 1,
    justifyContent: "center",
  },
  busName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  routeInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  routeText: {
    fontSize: 14,
    color: "#444",
  },
  stationsInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  stationsText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  rightSection: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  timeText: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
})

export default BusItem
