import { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  SafeAreaView,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import type { Bus, Station, RootStackParamList } from "../types/idx"
import { fetchBuses, fetchStations } from "../api/busService"
import BusItem from "../../components/BusItem"
import FilterTabs from "../../components/FilterTabs"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"

const Dashboard = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const [buses, setBuses] = useState<Bus[]>([])
  const [stations, setStations] = useState<Station[]>([])
  const [filteredBuses, setFilteredBuses] = useState<Bus[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("bus")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        const busesData = await fetchBuses()
        const stationsData = await fetchStations()

        setBuses(busesData)
        setFilteredBuses(busesData)
        setStations(stationsData)
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredBuses(buses)
      return
    }

    const query = searchQuery.toLowerCase()

    if (activeFilter === "bus") {
      const filtered = buses.filter(
        (bus) =>
          bus.busType.name.toLowerCase().includes(query) ||
          bus.stations.toString().includes(query)
      )
      setFilteredBuses(filtered)
    } else {
      const stationIds = stations
        .filter((station) => station.name.toLowerCase().includes(query))
        .map((station) => station.id)

      const filtered = buses.filter((bus) =>
        bus.stations.some((stationId) => stationIds.includes(stationId.id))
      )
      setFilteredBuses(filtered)
    }
  }, [searchQuery, activeFilter, buses, stations])

  const handleBusPress = (bus: Bus) => {
    navigation.navigate("BusDetail", { bus })
  }

  const handleMapView = () => {
    navigation.navigate("MapView", { buses: filteredBuses }) // si MapView accepte un tableau de Bus
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>MyBus</Text>
        <TouchableOpacity style={styles.mapButton} onPress={handleMapView}>
          <Ionicons name="map" size={24} color="#fff" />
          <Text style={styles.mapButtonText}>Carte</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder={activeFilter === "bus" ? "Rechercher un bus..." : "Rechercher une station..."}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery !== "" && (
          <TouchableOpacity onPress={() => setSearchQuery("")} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0066CC" />
          <Text style={styles.loaderText}>Chargement des bus...</Text>
        </View>
      ) : (
        <>
          <Text style={styles.resultsText}>
            {filteredBuses.length} {filteredBuses.length === 1 ? "bus trouvé" : "bus trouvés"}
          </Text>

          <FlatList
            data={filteredBuses}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <BusItem bus={item} onPress={() => handleBusPress(item)} />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons name="bus" size={50} color="#ccc" />
                <Text style={styles.emptyText}>Aucun bus trouvé</Text>
              </View>
            }
          />
        </>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#0066CC",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  mapButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  mapButtonText: {
    color: "#fff",
    marginLeft: 4,
    fontWeight: "500",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  clearButton: {
    padding: 4,
  },
  resultsText: {
    marginHorizontal: 16,
    marginBottom: 8,
    fontSize: 14,
    color: "#666",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
})

export default Dashboard
