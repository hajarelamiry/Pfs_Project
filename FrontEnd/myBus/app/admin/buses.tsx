"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native"
import { Bus, Search, Filter, Plus, MapPin, Battery, Wifi, Shield, MoreVertical } from "lucide-react-native"
import {useRouter} from "expo-router";

export default function BusesList() {
  const [searchQuery, setSearchQuery] = useState("")

  const router = useRouter();


  const navigateToAdd = () => router.push('../Bus/Add');

  // Mock data for buses
  const buses = [
    {
      id: "B-001",
      name: "City Express",
      route: "Downtown - Airport",
      status: "Active",
      driver: "Michael Johnson",
      capacity: 42,
      features: ["wifi", "charging", "security"],
      lastLocation: "Central Station",
      batteryLevel: 78,
    },
    {
      id: "B-002",
      name: "Metro Shuttle",
      route: "North End - South Terminal",
      status: "Active",
      driver: "Sarah Williams",
      capacity: 36,
      features: ["wifi", "charging"],
      lastLocation: "North Mall",
      batteryLevel: 65,
    },
    {
      id: "B-003",
      name: "Express Line",
      route: "East Side - West End",
      status: "Maintenance",
      driver: "Robert Davis",
      capacity: 40,
      features: ["wifi", "security"],
      lastLocation: "Service Center",
      batteryLevel: 22,
    },
    {
      id: "B-004",
      name: "Commuter Plus",
      route: "Suburbs - Business District",
      status: "Active",
      driver: "Emily Brown",
      capacity: 38,
      features: ["charging", "security"],
      lastLocation: "Business Park",
      batteryLevel: 91,
    },
    {
      id: "B-005",
      name: "Night Owl",
      route: "Downtown Loop",
      status: "Inactive",
      driver: "Unassigned",
      capacity: 30,
      features: ["wifi", "charging", "security"],
      lastLocation: "Bus Depot",
      batteryLevel: 45,
    },
  ]

  const renderFeatureIcon = (feature: "wifi" | "charging" | "security") => {
    switch (feature) {
      case "wifi":
        return <Wifi size={16} stroke="#1E40AF" />
      case "charging":
        return <Battery size={16} stroke="#1E40AF" />
      case "security":
        return <Shield size={16} stroke="#1E40AF" />
      default:
        return null
    }
  }
  


  const getStatusColor = (status: "Active" | "Maintenance" | "Inactive") => {
    switch (status) {
      case "Active":
        return { bg: "#EFF6FF", text: "#1E40AF" }
      case "Maintenance":
        return { bg: "#FEF3C7", text: "#D97706" }
      case "Inactive":
        return { bg: "#FEF2F2", text: "#DC2626" }
      default:
        return { bg: "#F3F4F6", text: "#6B7280" }
    }
  }
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bus Fleet</Text>
        <Text style={styles.headerSubtitle}>Manage your bus fleet</Text>
      </View>

      <View style={styles.actionsContainer}>
        <View style={styles.searchContainer}>
          <Search stroke="#64748B" size={20} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search buses..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#64748B"
          />
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.filterButton}>
            <Filter stroke="#1E40AF" size={18} />
            <Text style={styles.filterButtonText}>Filter</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.addButton} onPress={navigateToAdd}>
            <Plus stroke="#FFFFFF" size={18} />
            <Text style={styles.addButtonText}>Add Bus</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.busesContainer}>
        {buses.map((bus) => {
          const statusStyle = getStatusColor(bus.status as "Active" | "Maintenance" | "Inactive")

          return (
            <View key={bus.id} style={styles.busCard}>
              <View style={styles.busCardHeader}>
                <View style={styles.busIdContainer}>
                  <Bus stroke="#1E40AF" size={18} />
                  <Text style={styles.busId}>{bus.id}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                  <Text style={[styles.statusText, { color: statusStyle.text }]}>{bus.status}</Text>
                </View>
              </View>

              <Text style={styles.busName}>{bus.name}</Text>
              <Text style={styles.busRoute}>{bus.route}</Text>



              <View style={styles.divider} />

              <View style={styles.busDetailsRow}>
                <View style={styles.busDetailItem}>
                  <Text style={styles.busDetailLabel}>Capacity</Text>
                  <Text style={styles.busDetailValue}>{bus.capacity} seats</Text>
                </View>


              </View>

              <View style={styles.busFooter}>
                <View style={styles.featureContainer}>
                  {bus.features.map((feature, index) => (
                    <View key={index} style={styles.featureItem}>
                      {renderFeatureIcon(feature as "wifi" | "charging" | "security")}
                    </View>
                  ))}
                </View>

                <TouchableOpacity style={styles.moreButton}>
                  <MoreVertical size={20} stroke="#64748B" />
                </TouchableOpacity>
              </View>
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    padding: 20,
    backgroundColor: "#1E40AF",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#E0E7FF",
    marginTop: 5,
  },
  actionsContainer: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: "#1E293B",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  filterButtonText: {
    color: "#1E40AF",
    marginLeft: 6,
    fontWeight: "500",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E40AF",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  addButtonText: {
    color: "#FFFFFF",
    marginLeft: 6,
    fontWeight: "500",
  },
  busesContainer: {
    flex: 1,
    padding: 16,
  },
  busCard: {
    backgroundColor: "#FFFFFF",
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
    color: "#1E40AF",
    marginLeft: 6,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  busName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 4,
  },
  busRoute: {
    fontSize: 14,
    color: "#64748B",
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
    color: "#64748B",
    marginLeft: 6,
  },
  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
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
    color: "#64748B",
    marginBottom: 4,
  },
  busDetailValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B",
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
  moreButton: {
    padding: 4,
  },
})

