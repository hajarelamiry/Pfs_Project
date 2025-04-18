import { View, Text, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import type { Station } from "../app/types/index"

interface StationItemProps {
  station: Station
  isFirst: boolean
  isLast: boolean
  estimatedTime?: string
}

const StationItem = ({ station, isFirst, isLast, estimatedTime }: StationItemProps) => {
  // Icon based on station position
  const getIcon = () => {
    if (isFirst) return "flag"
    if (isLast) return "flag-outline"
    return "ellipse-outline"
  }

  return (
    <View style={styles.container}>
      <View style={styles.timeline}>
        <View style={[styles.line, isFirst && styles.lineHidden, { top: 0 }]} />
        <View style={styles.iconContainer}>
          <Ionicons name={getIcon()} size={isFirst || isLast ? 20 : 14} color="#0066CC" />
        </View>
        <View style={[styles.line, isLast && styles.lineHidden, { bottom: 0 }]} />
      </View>

      <View style={styles.content}>
        <Text style={styles.stationName}>{station.name}</Text>
        <View style={styles.detailsRow}>
          {station.facilities.map((facility, index) => (
            <View key={index} style={styles.facilityTag}>
              <Text style={styles.facilityText}>{facility}</Text>
            </View>
          ))}
        </View>
      </View>

      {estimatedTime && (
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{estimatedTime}</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 12,
  },
  timeline: {
    width: 30,
    alignItems: "center",
    position: "relative",
  },
  line: {
    position: "absolute",
    width: 2,
    backgroundColor: "#ddd",
    left: "50%",
    marginLeft: -1,
  },
  lineHidden: {
    backgroundColor: "transparent",
  },
  iconContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 2,
    zIndex: 1,
  },
  content: {
    flex: 1,
    paddingLeft: 8,
  },
  stationName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  detailsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  facilityTag: {
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 6,
    marginBottom: 4,
  },
  facilityText: {
    fontSize: 12,
    color: "#666",
  },
  timeContainer: {
    justifyContent: "center",
    paddingLeft: 8,
  },
  timeText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#0066CC",
  },
})

export default StationItem
