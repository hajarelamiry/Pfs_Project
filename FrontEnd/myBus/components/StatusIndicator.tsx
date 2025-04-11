import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import type { DriverStatus } from '../app/driver/DriverDashboard'
import { CheckCircle2, Pause, Navigation } from "lucide-react-native"

interface StatusIndicatorProps {
  currentStatus: DriverStatus
  onStatusChange: (status: DriverStatus) => void
  disabled?: boolean
}

export default function StatusIndicator({ currentStatus, onStatusChange, disabled = false }: StatusIndicatorProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.statusTab, currentStatus === "available" && styles.activeTab, disabled && styles.disabledTab]}
        onPress={() => onStatusChange("available")}
        disabled={disabled}
      >
        <CheckCircle2 size={20} color={currentStatus === "available" ? "#fff" : "#333"} />
        <Text style={[styles.statusText, currentStatus === "available" && styles.activeText]}>Disponible</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.statusTab, currentStatus === "paused" && styles.activeTab, disabled && styles.disabledTab]}
        onPress={() => onStatusChange("paused")}
        disabled={disabled}
      >
        <Pause size={20} color={currentStatus === "paused" ? "#fff" : "#333"} />
        <Text style={[styles.statusText, currentStatus === "paused" && styles.activeText]}>En pause</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.statusTab,
          currentStatus === "on_trip" && styles.activeTab,
          disabled && !currentStatus.includes("on_trip") && styles.disabledTab,
        ]}
        onPress={() => onStatusChange("on_trip")}
        disabled={disabled && currentStatus !== "on_trip"}
      >
        <Navigation size={20} color={currentStatus === "on_trip" ? "#fff" : "#333"} />
        <Text style={[styles.statusText, currentStatus === "on_trip" && styles.activeText]}>En route</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#e1e1e1",
  },
  statusTab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    gap: 8,
  },
  activeTab: {
    backgroundColor: "#0070f3",
  },
  disabledTab: {
    opacity: 0.5,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  activeText: {
    color: "#fff",
  },
})
