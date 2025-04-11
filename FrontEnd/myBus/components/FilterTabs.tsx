import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"

interface FilterTabsProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
}

const FilterTabs = ({ activeFilter, onFilterChange }: FilterTabsProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tab, activeFilter === "bus" && styles.activeTab]}
        onPress={() => onFilterChange("bus")}
      >
        <Ionicons name="bus" size={18} color={activeFilter === "bus" ? "#0066CC" : "#666"} />
        <Text style={[styles.tabText, activeFilter === "bus" && styles.activeTabText]}>Recherche par bus</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, activeFilter === "station" && styles.activeTab]}
        onPress={() => onFilterChange("station")}
      >
        <Ionicons name="location" size={18} color={activeFilter === "station" ? "#0066CC" : "#666"} />
        <Text style={[styles.tabText, activeFilter === "station" && styles.activeTabText]}>Recherche par station</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    overflow: "hidden",
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  activeTab: {
    backgroundColor: "#e6f0ff",
  },
  tabText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#666",
  },
  activeTabText: {
    color: "#0066CC",
    fontWeight: "500",
  },
})

export default FilterTabs
