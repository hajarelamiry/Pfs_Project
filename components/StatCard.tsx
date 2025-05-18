import type React from "react"
import { View, Text, StyleSheet } from "react-native"
import { ArrowUp, ArrowDown } from "lucide-react-native"
import { Colors } from "../constants/Colors"

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ElementType
  change?: {
    value: number
    isIncrease: boolean
  }
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, change }) => {
  return (
    <View style={styles.statCard}>
      <View style={styles.statHeader}>
        <Text style={styles.statTitle}>{title}</Text>
        {change && (
          <View style={[styles.statBadge, change.isIncrease ? styles.increaseBadge : styles.decreaseBadge]}>
            {change.isIncrease ? (
              <ArrowUp size={12} stroke={Colors.status.success.text} />
            ) : (
              <ArrowDown size={12} stroke={Colors.status.error.text} />
            )}
            <Text style={change.isIncrease ? styles.increaseBadgeText : styles.decreaseBadgeText}>{change.value}%</Text>
          </View>
        )}
      </View>
      <View style={styles.statContent}>
        <Text style={styles.statValue}>{value}</Text>
        <Icon stroke={Colors.primary.main} size={24} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  statCard: {
    backgroundColor: Colors.background.paper,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  statTitle: {
    fontSize: 12,
    color: Colors.text.secondary,
  },
  statBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
  },
  increaseBadge: {
    backgroundColor: Colors.status.success.background,
  },
  decreaseBadge: {
    backgroundColor: Colors.status.error.background,
  },
  increaseBadgeText: {
    fontSize: 10,
    fontWeight: "600",
    color: Colors.status.success.text,
    marginLeft: 2,
  },
  decreaseBadgeText: {
    fontSize: 10,
    fontWeight: "600",
    color: Colors.status.error.text,
    marginLeft: 2,
  },
  statContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text.primary,
  },
})

