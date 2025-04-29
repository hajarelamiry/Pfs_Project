import { View, Text, StyleSheet } from "react-native"
import { Marker, Callout } from "react-native-maps"
import type { Station } from "../app/types/index"

interface StationMarkerProps {
  station: Station
}

const StationMarker = ({ station }: StationMarkerProps) => {
  return (
    <Marker
      coordinate={{
        latitude: station.latitude,
        longitude: station.longitude,
      }}
      tracksViewChanges={false}
    >
      <View style={styles.markerContainer}>
        <View style={styles.marker} />
      </View>

      <Callout tooltip>
        <View style={styles.calloutContainer}>
          <Text style={styles.stationName}>{station.name}</Text>
          {station.estimatedTime && <Text style={styles.estimatedTime}>Prochain bus: {station.estimatedTime}</Text>}
          {station.facilities.length > 0 && (
            <View style={styles.facilitiesContainer}>
              {station.facilities.map((facility, index) => (
                <Text key={index} style={styles.facility}>
                  {facility}
                </Text>
              ))}
            </View>
          )}
        </View>
      </Callout>
    </Marker>
  )
}

const styles = StyleSheet.create({
  markerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#0066CC",
  },
  calloutContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    width: 150,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  stationName: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 4,
  },
  estimatedTime: {
    fontSize: 12,
    color: "#0066CC",
    marginBottom: 4,
  },
  facilitiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  facility: {
    fontSize: 10,
    color: "#666",
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginRight: 4,
    marginBottom: 2,
  },
})

export default StationMarker
