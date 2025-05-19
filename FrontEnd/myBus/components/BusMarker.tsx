import { View, Text, StyleSheet } from "react-native"
import { Marker } from "react-native-maps"
import { Ionicons } from "@expo/vector-icons"
import type { BusLocation } from "../app/types/idx"

interface BusMarkerProps {
  location: BusLocation
  isSelected: boolean
}

const BusMarker = ({ location, isSelected }: BusMarkerProps) => {
  return (
    <Marker
      coordinate={{
        latitude: location.latitude,
        longitude: location.longitude,
      }}
      rotation={location.heading}
      tracksViewChanges={false}
    >
      <View style={[styles.markerContainer, isSelected && styles.selectedMarker]}>
        <Ionicons name="bus" size={isSelected ? 24 : 20} color={isSelected ? "#fff" : "#0066CC"} />
      </View>
      {isSelected && (
        <View style={styles.busInfo}>
          <Text style={styles.busNumber}>{location.busNumber}</Text>
        </View>
      )}
    </Marker>
  )
}

const styles = StyleSheet.create({
  markerContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 6,
    borderWidth: 2,
    borderColor: "#0066CC",
  },
  selectedMarker: {
    backgroundColor: "#0066CC",
    borderColor: "#fff",
    padding: 8,
  },
  busInfo: {
    backgroundColor: "#0066CC",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 4,
  },
  busNumber: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
})

export default BusMarker
