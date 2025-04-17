"use client"

import { useEffect, useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from "react-native"
import { Bus as BusIcon, Search, Filter, Plus, Battery, Wifi, Shield, Edit, Trash2 } from "lucide-react-native"
import { useRouter } from "expo-router"

type Bus = {
  id: number
  name?: string
  capacity: number
  statut: string
  wifi: boolean
  charging: boolean
  security: boolean
  busType: {
    id: number
    name: string
    firstStation: string
    lastStation: string
  }
  driver: {
    id: number
    firstName: string
    lastName: string
    email: string
    phone: string
  }
}

export default function BusesList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)

  const router = useRouter()
  const [buses, setBuses] = useState<Bus[]>([])

  useEffect(() => {
    fetchBuses()
  }, [])

  const fetchBuses = async () => {
    try {
      setLoading(true)
      const response = await fetch("http://100.89.162.136:8003/api/buses/allBuses", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa("admin:h200317"),
        },
      })
      if (!response.ok) {
        throw new Error(`Erreur HTTP! status: ${response.status}`)
      }
      const data = await response.json()
      setBuses(data)
    } catch (err) {
      console.error("Erreur de recuperation des bus", err)
    } finally {
      setLoading(false)
    }
  }

  const navigateToAdd = () => router.push("../Bus/Add")

  const navigateToEdit = (busId: number) => {
    router.push(`../Bus/Edit/${busId}`)
  }

  const deleteBus = async (busId: number) => {
    try {
      setLoading(true)
      const response = await fetch(`http://100.89.161.147:8003/api/buses/bus/${busId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa("admin:h200317"),
        },
      })

      if (!response.ok) {
        throw new Error(`Erreur HTTP! status: ${response.status}`)
      }

      fetchBuses()
      Alert.alert("Succès", "Bus supprimé avec succès")
    } catch (err) {
      console.error("Erreur lors de la suppression du bus", err)
      Alert.alert("Erreur", "Impossible de supprimer le bus")
    } finally {
      setLoading(false)
    }
  }

  const confirmDelete = (busId: number, busName: string) => {
    Alert.alert("Confirmer la suppression", `Êtes-vous sûr de vouloir supprimer le bus ${busName} ?`, [
      { text: "Annuler", style: "cancel" },
      { text: "Supprimer", onPress: () => deleteBus(busId), style: "destructive" },
    ])
  }

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In service":
        return { bg: "#EFF6FF", text: "#1E40AF" }
      case "Under maintenance":
        return { bg: "#FEF3C7", text: "#D97706" }
      case "Out of service":
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
            return (
                <View key={bus.id} style={styles.busCard}>
                  <View style={styles.busCardHeader}>
                    <View style={styles.busIdContainer}>
                      <BusIcon stroke="#1E40AF" size={18} />
                      <Text style={styles.busId}>{bus.busType.name}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(bus.statut).bg }]}>
                      <Text style={[styles.statusText, { color: "#0369A1" }]}>{bus.statut}</Text>
                    </View>
                  </View>

                  <Text style={styles.busName}>
                    🚍 {bus.busType.firstStation} → {bus.busType.lastStation}
                  </Text>

                  <Text style={styles.busRoute}>
                    👤 {bus.driver.firstName} {bus.driver.lastName}
                  </Text>

                  <View style={styles.divider} />

                  <View style={styles.busDetailsRow}>
                    <View style={styles.busDetailItem}>
                      <Text style={styles.busDetailLabel}>Capacity</Text>
                      <Text style={styles.busDetailValue}>{bus.capacity} seats</Text>
                    </View>
                  </View>

                  <View style={styles.busFooter}>
                    <View style={styles.featureContainer}>
                      {bus.wifi && <View style={styles.featureItem}>{renderFeatureIcon("wifi")}</View>}
                      {bus.charging && <View style={styles.featureItem}>{renderFeatureIcon("charging")}</View>}
                      {bus.security && <View style={styles.featureItem}>{renderFeatureIcon("security")}</View>}
                    </View>

                    <View style={styles.actionButtons}>
                      <TouchableOpacity style={styles.editButton} onPress={() => navigateToEdit(bus.id)}>
                        <Edit size={16} stroke="#FFFFFF" />
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDelete(bus.id, bus.busType.name)}>
                        <Trash2 size={16} stroke="#FFFFFF" />
                      </TouchableOpacity>
                    </View>
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
    marginTop: 8,
  },
  featureContainer: {
    flexDirection: "row",
  },
  featureItem: {
    marginRight: 12,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E40AF",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  editButtonText: {
    color: "#FFFFFF",
    marginLeft: 4,
    fontWeight: "500",
    fontSize: 12,
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DC2626",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  deleteButtonText: {
    color: "#FFFFFF",
    marginLeft: 4,
    fontWeight: "500",
    fontSize: 12,
  },
})
