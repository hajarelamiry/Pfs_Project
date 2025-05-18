import type React from "react"
import { View, Text, StyleSheet } from "react-native"
import { Bus, MapPin, Battery, Wifi, Shield, Edit, Trash2 } from "lucide-react-native"
import { Colors } from "../constants/Colors"
import { StatusBadge } from "./StatusBadge"
import { ActionButton } from "./ActionButton"

interface BusCardProps {
  bus: {
    id: string
    name: string
    route: string
    status: "Active" | "Maintenance" | "Inactive"
    driver: string
    capacity: number
    features: string[]
    lastLocation: string
    batteryLevel: number
  }
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export const BusCard: React.FC<BusCardProps> = ({ bus, onEdit, onDelete }) => {
  const renderFeatureIcon = (feature: string) => {
    switch (feature) {
      case "wifi":
        return <Wifi size={16} stroke={Colors.primary.main} />
      case "charging":
        return <Battery size={16} stroke={Colors.primary.main} />
      case "security":
        return <Shield size={16} stroke={Colors.primary.main} />
      default:
        return null
    }
  }

  const getBatteryColor = (level: number) => {
    if (level > 70) return Colors.battery.high
    if (level > 30) return Colors.battery.medium
    return Colors.battery.low
  }

  return (
    <View style={styles.busCard}>
      <View style={styles.busCardHeader}>
        <View style={styles.busIdContainer}>
          <Bus stroke={Colors.primary.main} size={18} />
          <Text style={styles.busId}>{bus.id}</Text>
        </View>
        <StatusBadge status={bus.status} />
      </View>

      <Text style={styles.busName}>{bus.name}</Text>
      <Text style={styles.busRoute}>{bus.route}</Text>

      <View style={styles.busInfoRow}>
        <View style={styles.busInfoItem}>
          <MapPin size={16} stroke={Colors.secondary.main} />
          <Text style={styles.busInfoText}>{bus.lastLocation}</Text>
        </View>
        <View style={styles.busInfoItem}>
          <Text style={styles.busInfoText}>Driver: {bus.driver}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.busDetailsRow}>
        <View style={styles.busDetailItem}>
          <Text style={styles.busDetailLabel}>Capacity</Text>
          <Text style={styles.busDetailValue}>{bus.capacity} seats</Text>
        </View>

        <View style={styles.busDetailItem}>
          <Text style={styles.busDetailLabel}>Battery</Text>
          <View style={styles.batteryContainer}>
            <View
              style={[
                styles.batteryLevel,
                {
                  width: `${bus.batteryLevel}%`,
                  backgroundColor: getBatteryColor(bus.batteryLevel),
                },
              ]}
            />
            <Text style={styles.batteryText}>{bus.batteryLevel}%</Text>
          </View>
        </View>
      </View>

      <View style={styles.busFooter}>
        <View style={styles.featureContainer}>
          {bus.features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              {renderFeatureIcon(feature)}
            </View>
          ))}
        </View>

        <View style={styles.actionButtons}>
          <ActionButton icon={Edit} variant="outline" size="small" onPress={() => onEdit(bus.id)} />
          <View style={styles.buttonSpacer} />
          <ActionButton icon={Trash2} variant="danger" size="small" onPress={() => onDelete(bus.id)} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  busCard: {
    backgroundColor: Colors.background.paper,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  busCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  busIdContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  busId: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primary.main,
    marginLeft: 6,
  },
  busName: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text.primary,
    marginBottom: 4,
  },
  busRoute: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 12,
  },
  busInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  busInfoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  busInfoText: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginLeft: 6,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border.main,
    marginVertical: 12,
  },
  busDetailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  busDetailItem: {
    flex: 1,
  },
  busDetailLabel: {
    fontSize: 12,
    color: Colors.text.secondary,
    marginBottom: 4,
  },
  busDetailValue: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text.primary,
  },
  batteryContainer: {
    height: 16,
    backgroundColor: Colors.background.input,
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
  },
  batteryLevel: {
    height: "100%",
    position: "absolute",
    left: 0,
    top: 0,
  },
  batteryText: {
    position: "absolute",
    right: 6,
    top: 0,
    fontSize: 10,
    fontWeight: "600",
    color: Colors.text.primary,
  },
  busFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  featureContainer: {
    flexDirection: "row",
  },
  featureItem: {
    marginRight: 12,
  },
  actionButtons: {
    flexDirection: "row",
  },
  buttonSpacer: {
    width: 8,
  },
})

