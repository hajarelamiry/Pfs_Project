import type React from "react"
import { View, Text, StyleSheet } from "react-native"
import { Colors } from "../constants/Colors"

interface StatusBadgeProps {
  status: "Active" | "Inactive" | "Maintenance" | "Warning" | "Success" | "Error"
  size?: "small" | "medium" | "large"
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = "medium" }) => {
  const getStatusStyle = () => {
    switch (status) {
      case "Active":
        return {
          backgroundColor: Colors.status.active.background,
          textColor: Colors.status.active.text,
        }
      case "Inactive":
        return {
          backgroundColor: Colors.status.inactive.background,
          textColor: Colors.status.inactive.text,
        }
      case "Maintenance":
        return {
          backgroundColor: Colors.status.maintenance.background,
          textColor: Colors.status.maintenance.text,
        }
      case "Warning":
        return {
          backgroundColor: Colors.status.warning.background,
          textColor: Colors.status.warning.text,
        }
      case "Success":
        return {
          backgroundColor: Colors.status.success.background,
          textColor: Colors.status.success.text,
        }
      case "Error":
        return {
          backgroundColor: Colors.status.error.background,
          textColor: Colors.status.error.text,
        }
      default:
        return {
          backgroundColor: Colors.status.active.background,
          textColor: Colors.status.active.text,
        }
    }
  }

  const getSizeStyle = () => {
    switch (size) {
      case "small":
        return styles.smallBadge
      case "medium":
        return styles.mediumBadge
      case "large":
        return styles.largeBadge
      default:
        return styles.mediumBadge
    }
  }

  const { backgroundColor, textColor } = getStatusStyle()

  return (
    <View style={[styles.badge, getSizeStyle(), { backgroundColor }]}>
      <Text style={[styles.badgeText, { color: textColor }]}>{status}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    fontWeight: "500",
  },
  smallBadge: {
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  mediumBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  largeBadge: {
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  smallText: {
    fontSize: 10,
  },
  mediumText: {
    fontSize: 12,
  },
  largeText: {
    fontSize: 14,
  },
})

